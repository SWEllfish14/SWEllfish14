const express = require('express')
const bodyParser = require('body-parser')
const pool = require('./queries')
const app = express()
const port = 3002
const http = require('http');


const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:142';
const cors = require("cors");
app.use(cors());
app.use(express.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

//lista di tutte le aree
app.get('/aree', async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT ID,zona_geografica FROM lumosminima.area_illuminata";

    // we run the query and set the result to a new variable
    var rows = await conn.query(query);

    // return the results
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//lista di tutti i guasti
app.get('/guasti', async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT ID,zona_geografica,id_area_illuminata FROM lumosminima.guasto";

    // we run the query and set the result to a new variable
    var rows = await conn.query(query);

    // return the results
    res.send(rows);
  } catch (err) {
    console.log("oof")
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

const headers = {

  'Content-Type': 'application/json'

}

//Lampioni dell'area

app.get('/lamps/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT IP,status FROM lumosminima.lampione WHERE id_area_illuminata=?";


    var rows = await conn.query(query, [id]);
    var result = [];
    await Promise.all(rows.map(async (lamp) => {
      try {
        const response = await axios.get('http://' + lamp.IP + ":3020/lamp", headers)
        console.log(response.data)
        result.push(response.data)
      }
      catch (e) {
        console.log(e.response)
      }
    }))



    res.contentType('application/json');
    res.send(JSON.stringify(result));
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//Area da ID
app.get('/area/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT ID,zona_geografica,stato,luminosita_impostata,luminosita_default,user_amministratore FROM lumosminima.area_illuminata WHERE ID=?";


    var rows = await conn.query(query, [id]);

    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//lista sensori
app.get('/sensori/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT IP,zona_geografica,iterazione,raggio_azione,polling_time,id_area_illuminata FROM lumosminima.sensore WHERE id_area_illuminata=?";


    var rows = await conn.query(query, [id]);
    var sensore;
    var result = [];
    await Promise.all(rows.map(async (sens) => {
      try {
        const response = await axios.get(sens.IP + "/sensore", headers)
        console.log(response.data)
        sensore = response.data;
        result.push(response.data)
      }
      catch (e) {
        console.log(e.response)
      }
    }))



    res.contentType('application/json');
    res.send(JSON.stringify(result));
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//lista  amministratori
app.get('/amministratori', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT Username FROM lumosminima.amministratore";


    var rows = await conn.query(query);

    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//aggiungi nuova area
app.post('/aggiungiArea', async (req, res) => {
  let conn;
  const { zonaArea, statoArea, luminositaImpostataArea, luminositaDefaultArea, userAmministratore } = req.body;
  try {

    console.log(req.body)
    conn = await pool.getConnection();

    console.log("connesso")
    var idQuery = "SELECT MAX(ID) FROM lumosminima.area_illuminata";
    var id = await conn.query(idQuery);
    id = (id[0]["MAX(ID)"]) + 1
    var insertquery = "INSERT INTO lumosminima.area_illuminata (ID,zona_geografica,stato,luminosita_impostata,luminosita_default,user_amministratore) VALUES(?,?,?,?,?,?)";

    var result = await conn.query(insertquery, [id, zonaArea, statoArea, luminositaImpostataArea, luminositaDefaultArea, userAmministratore.Username]);

    console.log(result)
  } catch (err) {
    console.log(err)
    throw err;

  } finally {
    if (conn) return conn.release();
  }
});

//accendi luce 
app.post('/accendi', async (req, res) => {
  let conn;
})

app.post('/autenticazione', async (req, res) => {
  let conn;
  const { nomeUtente, password } = req.body;
  try {

    console.log(nomeUtente)
    conn = await pool.getConnection();
    var usernameQuery = "SELECT * FROM lumosminima.amministratore WHERE Username = ?"
    var rows = await conn.query(usernameQuery, [nomeUtente])
    if(rows.length >0)
    {
      if(rows[0].PASSWORD == password)
      {
        console.log("Login riuscito")
        res.sendStatus(200)
      }else{
        console.log("pass sbagliata")
        res.sendStatus(401)
      }
    }
    else{
      console.log("username non esistente")
      res.sendStatus(401)
    }
  } catch (err) {
    console.log(err)
    throw err;

  } finally {
    if (conn) return conn.release();
  }
})

//rimuovi area da guasti
app.post('/rimuoviGuasto', async (req, res) => {
  let conn;
  const id = req.query.id
  try {
    
    conn = await pool.getConnection();
    var rimuoviQuery = "DELETE FROM lumosminima.guasto WHERE id = ?"
    var rows = await conn.query(rimuoviQuery, [id])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})

//aggiungi area a guasti
app.post('/aggiungiGuasto', async (req, res) => {
  let conn;
  const idArea = req.query.id["ID"]
  const zonaGeografica = req.query.id["zona_geografica"]
  console.log(idArea)
  console.log(zonaGeografica)
  try {
    conn = await pool.getConnection();
    
    var idQuery = "SELECT MAX(ID) FROM lumosminima.guasto";
    var id = await conn.query(idQuery);
    id = (id[0]["MAX(ID)"]) + 1

    var rimuoviQuery = "INSERT INTO lumosminima.guasto (ID,zona_geografica,id_area_illuminata) VALUES(?,?,?) "
    var rows = await conn.query(rimuoviQuery, [id,zonaGeografica,idArea])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})