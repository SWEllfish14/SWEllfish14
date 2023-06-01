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

      
      var rows = await conn.query(query,[id]);
      var lamp;
      var result = [];
      await Promise.all(rows.map(async(lamp) =>{
        try {
         const response=await axios.get("http://192.168.1.124:3020/lamp",headers)
         console.log(response.data)
         lamp=response.data;
         result.push(response.data)
         }
         catch(e){
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

        
        var rows = await conn.query(query,[id]);

        res.send(rows);
    } catch (err) {
        throw err;
    } finally {
        if (conn) return conn.release();
    }
});