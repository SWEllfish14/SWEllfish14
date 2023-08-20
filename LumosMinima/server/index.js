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

  //per ottenere il numero di guasti da mostrare nella dashboard
app.get('/numeroGuasti', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      var rimuoviQuery = "SELECT ID, count(ID) AS numero_guasti FROM lumosminima_pb.guasto;"
      var rows = await conn.query(rimuoviQuery)
      console.log(rows[0].numero_guasti)
      res.send(rows[0].numero_guasti.toString())
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  })
  
  
//per ottenere il numero dei lampioni da mostrare nella dashboard
app.get('/numeroLampioni', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      var Query = "SELECT COUNT(*) AS numero_lampioni FROM lumosminima_pb.lampione;"
      var rows = await conn.query(Query)
      console.log(rows[0].numero_lampioni)
      res.send(rows[0].numero_lampioni.toString())
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  })

  //rimuovi area
app.post('/eliminaArea/:id', async (req, res) => {
  let conn;
  const id= req.params.id;
  try {
    conn = await pool.getConnection();
    //var rimuoviSensoriQuery = "DELETE FROM lumosminima_pb.sensore WHERE id_area_illuminata = ?"
    //await conn.query(rimuoviSensoriQuery,[id])
    //var rimuoviLampioniQuery = "DELETE FROM lumosminima_pb.lampione WHERE id_area_illuminata = ?"
    //await conn.query(rimuoviLampioniQuery,[id])
    //var rimuoviGuastiQuery = "DELETE FROM lumosminima_pb.guasto WHERE id_area_illuminata = ?"
    //await conn.query(rimuoviGuastiQuery,[id])
    var rimuoviAreaQuery = "DELETE FROM lumosminima_pb.area_illuminata WHERE ID = ?"
    var rows = await conn.query(rimuoviAreaQuery, [id])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})
//lista di tutte le aree
app.get('/aree', async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT ID,città,zona_geografica_città FROM lumosminima_pb.area_illuminata";

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

//aggiungi nuova area
app.post('/aggiungiArea', async (req, res) => {
  let conn;
  const { zonaArea, statoArea, luminositaImpostataArea, luminositaDefaultArea, userAmministratore } = req.body;
  try {

    console.log(req.body)
    conn = await pool.getConnection();

    console.log("connesso")
    var idQuery = "SELECT MAX(ID) FROM lumosminima_pb.area_illuminata";
    var id = await conn.query(idQuery);
    id = (id[0]["MAX(ID)"]) + 1
    var insertquery = "INSERT INTO lumosminima_pb.area_illuminata (ID,zona_geografica,stato,luminosita_impostata,luminosita_default,user_amministratore) VALUES(?,?,?,?,?,?)";

    var result = await conn.query(insertquery, [id, zonaArea, statoArea, luminositaImpostataArea, luminositaDefaultArea, userAmministratore.Username]);

    console.log(result)
  } catch (err) {
    console.log(err)
    throw err;

  } finally {
    if (conn) return conn.release();
  }
});

//dettagli lampione in base all'ID
  app.get('/lampione/:id', async (req, res) => {

    const id = parseInt(req.params.id)
    let conn;
    try {
  
      conn = await pool.getConnection();
  
      var query = "SELECT ID,IP, luminosità_default, luminosità_impostata FROM lumosminima_pb.lampione WHERE ID = ?";
      var rows = await conn.query(query, [id]);
      res.send(rows[0]);
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  });
  

  //dettagli sensore in base all'ID
  app.get('/sensore/:id', async (req, res) => {

    const id = parseInt(req.params.id)
    let conn;
    try {
  
      conn = await pool.getConnection();
  
      var query = "SELECT ID, IP, polling_time, zona_geografica_posizionamento, raggio_azione FROM lumosminima_pb.sensore WHERE ID = ?";
      var rows = await conn.query(query, [id]);
      res.send(rows[0]);
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  });
  

//per ottenere il numero dei sensori per la dashboard
app.get('/numeroSensori', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      var Query = "SELECT COUNT(*) AS numero_sensori FROM lumosminima_pb.sensore;"
      var rows = await conn.query(Query)
      console.log(rows[0].numero_sensori)
      res.send(rows[0].numero_sensori.toString())
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  })

  //per ottenere il numero delle aree per la dashboard
app.get('/numeroAree', async (req, res) => {
    let conn;
    try {
      conn = await pool.getConnection();
      var Query = "SELECT COUNT(*) AS numero_aree FROM lumosminima_pb.area_illuminata;"
      var rows = await conn.query(Query)
      console.log(rows[0].numero_aree)
      res.send(rows[0].numero_aree.toString())
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  })

  //lista di tutte le aree per la dashboard(limitate a 5)
app.get('/areelimit', async (req, res) => {
    let conn;
    try {
      // here we make a connection to MariaDB
      conn = await pool.getConnection();
  
      // create a new query to fetch all records from the table
      var query = "SELECT ID,città,stato,zona_geografica_città FROM lumosminima_pb.area_illuminata ORDER BY ID ASC limit 5;";
  
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
    var query = "SELECT guasto.ID, guasto.data_rilevamento, guasto.id_area_illuminata, area_illuminata.città, area_illuminata.zona_geografica_città FROM lumosminima_pb.guasto JOIN lumosminima_pb.area_illuminata ON guasto.id_area_illuminata = area_illuminata.ID;";

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
//Area da ID
app.get('/area/:id', async (req, res) => {

  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();

    var query = "SELECT ID,città,zona_geografica_città,modalità_funzionamento,luminosità_standard,luminosità_rilevamento,luminosità_manuale, stato FROM lumosminima_pb.area_illuminata WHERE ID=?";
    var rows = await conn.query(query, [id]);
    res.send(rows[0]);
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//Area da ID
app.get('/editarea/:id', async (req, res) => {

  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();

   // var query = "UPDATE area_illuminata SET città,zona_geografica_città,modalità_funzionamento,luminosità_standard,luminosità_rilevamento,luminosità_manuale, stato FROM lumosminima_pb.area_illuminata WHERE ID=?";
    var rows = await conn.query(query, [id]);
    res.send(rows[0]);
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//elimina lampione
app.post('/eliminaLampione/:id', async (req, res) => {
    let conn;
    const id= req.params.id;
    try {
      conn = await pool.getConnection();
      var rimuoviQuery = "DELETE FROM lumosminima_pb.lampione WHERE ID = ?"
      var rows = await conn.query(rimuoviQuery, [id])
      res.sendStatus(200)
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  })


//aggiunta lampione
app.post('/aggiungiLampione', async (req, res) => {
  let conn;
  const id = req.query.id;
  const ip = req.query.ip;
  const iter = req.query.tipo_interazione;
  const lum_def = req.query-lumonosità_default;
  const lum_rilev = req.query.luminostità_rilevamento;
  const id_area = req.query.id_area_illuminata;


  try {
    conn = await pool.getConnection();
    var aggiungiaQuery = 'INSERT INTO lampione VALUES (?,?,?,?,?,?)'
    await conn.query(eliminaQuery,[id], [ip], [iter],[lum_def],[lum_ril], [id_area])
   
    res.sendStatus(200)
    
    
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})

//query per ottenere id aree da inserire nel form di aggiunta del lampione
app.get('/idAree', async (req, res) => {
    let conn;
    try {
  
      conn = await pool.getConnection();
  
      var query = "SELECT ID FROM lumosminima_pb.area_illuminata;";
      var rows = await conn.query(query);
      res.send(rows);
    } catch (err) {
      console.log(err)
      throw err;
    } finally {
      if (conn) return conn.release();
    }
  });
//Lampioni dell'area

app.get('/lamps/:id', async (req, res) =>{
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT IP,ID,tipo_interazione,luminosità_default,luminosità_impostata, id_area_illuminata FROM lumosminima_pb.lampione WHERE id_area_illuminata=? ";


    var rows = await conn.query(query, [id]);
    var result = [];
    await Promise.all(rows.map(async (lamp) => {
      try {
       // console.log('http://' + lamp.IP + ":3020/lamp")
        //const response = await axios.get('http://' + lamp.IP + ":3020/lamp", headers)
        //response.data.ip = lamp.IP
        //console.log(response.data)
        //result.push(response.data)
      }
      catch (e) {
       console.log(e.response)
      }
      }))
    
    
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
  });
  
  app.get('/sensori/:id', async (req, res) =>{
    const id = parseInt(req.params.id)
    let conn;
    try {
  
      conn = await pool.getConnection();
  
  
      var query = "SELECT IP,ID,polling_time,zona_geografica_posizionamento,tipo_interazione,raggio_azione, id_area_illuminata FROM lumosminima_pb.sensore WHERE id_area_illuminata=? ";
  
  
      var rows = await conn.query(query, [id]);
      var result = [];
      await Promise.all(rows.map(async (lamp) => {
        try {
         // console.log('http://' + lamp.IP + ":3020/lamp")
          //const response = await axios.get('http://' + lamp.IP + ":3020/lamp", headers)
          //response.data.ip = lamp.IP
          //console.log(response.data)
          //result.push(response.data)
        }
        catch (e) {
         console.log(e.response)
        }
        }))
      
      
      res.send(rows);
    } catch (err) {
      throw err;
    } finally {
      if (conn) return conn.release();
    }
    });
    
 
/*app.get('/lamps', async (req, res) =>{
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT IP,ID,luminosità_default,luminosità_impostata, id_area_illuminata FROM lumosminima_pb.lampione WHERE id_area_illuminata=1 ";


    var rows = await conn.query(query);
    var result = [];
    await Promise.all(rows.map(async (lamp) => {
      try {
       // console.log('http://' + lamp.IP + ":3020/lamp")
        //const response = await axios.get('http://' + lamp.IP + ":3020/lamp", headers)
        //response.data.ip = lamp.IP
        //console.log(response.data)
        //result.push(response.data)
      }
      catch (e) {
       console.log(e.response)
      }
      }))
    
    
    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
  });
  */
//aumentare luminosita a una specifica area
app.post('/area/:id/aumentaluminosita', async (req, res) => {
  let conn;
  const id= req.params.id;
  try {
    
    conn = await pool.getConnection();

    var getcurrentlumquery = "SELECT luminosità_manuale FROM lumosminima_pb.area_illuminata WHERE ID = ?"
    var luminositaimpostata = await conn.query(getcurrentlumquery, [id]);
    luminositadaimpostare = (luminositaimpostata[0]["luminosità_manuale"])+1
    console.log(luminositadaimpostare)
    var aumentalumquery = " ";
    if(luminositadaimpostare <= 10){
     aumentalumquery = "UPDATE lumosminima_pb.area_illuminata SET luminosità_manuale = ? WHERE ID = ? ";
    }

    var result = await conn.query(aumentalumquery, [luminositadaimpostare,id]);
    console.log(result)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;

  } finally {
    if (conn) return conn.release();
  }
})

//diminuire luminosita a una specifica area
app.post('/area/:id/diminuisciluminosita', async (req, res) => {
  let conn;
  const id= req.params.id;
  try {
    
    conn = await pool.getConnection();

    var getcurrentlumquery = "SELECT luminosità_manuale FROM lumosminima_pb.area_illuminata WHERE ID = ?"
    var luminositaimpostata = await conn.query(getcurrentlumquery, [id]);
    luminositadaimpostare = (luminositaimpostata[0]["luminosità_manuale"])-1
    var aumentalumquery = " ";
    if(luminositadaimpostare >= 0){
    aumentalumquery = "UPDATE lumosminima_pb.area_illuminata SET luminosità_manuale = ? WHERE ID = ? ";
    }
    var result = await conn.query(aumentalumquery, [luminositadaimpostare,id]);
    console.log(result)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;

  } finally {
    if (conn) return conn.release();
  }
})


/*


  //lista di tutti i guasti
app.get('/guasti', async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT COUNT(ID) FROM lumosminima_pb.guasto;";

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


app.get('/areenumber', async (req, res) => {
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT ID, COUNT(*) AS Num_aree FROM lumosminima_pb.area_illuminata;";

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




/*
   res.contentType('application/json');
    res.send(JSON.stringify(result));
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

const id = parseInt(req.params.id)
let conn;
try {

  conn = await pool.getConnection();


  var query = "SELECT IP,status FROM lumosminima_pb.lampione WHERE id_area_illuminata=?";


  var rows = await conn.query(query, [id]);
  var result = [];
  await Promise.all(rows.map(async (lamp) => {
   try {
      //console.log('http://' + lamp.IP + ":3020/lamp")
      //const response = await axios.get('http://' + lamp.IP + ":3020/lamp", headers)
      //response.data.ip = lamp.IP
      //console.log(response.data)
      //result.push(response.data)
    }
    catch (e) {
      console.log(e.response)
    }
    
  }))

  
  res.contentType('application/json');
  res.send(JSON.stringify(result));
} 
catch (err) {
  throw err;
} finally {
  if (conn) return conn.release();
}
});
*/
//accendi lampione
/*app.post('/accendiLampione', async (req, res) => {
  let conn;
  const zona_id = req.query.id
  const lamp_ip = req.query.ip;
  
  try {
    
    conn = await pool.getConnection();
    var brightnessQuery = 'SELECT luminosita_impostata FROM lumosminima_pb.area_illuminata WHERE ID=?'
    
    var rows = await conn.query(brightnessQuery,[zona_id]);
    var bright = rows[0].luminosita_impostata; 
      
    await axios.post("http://127.0.0.1:3020/lamp",{brightness:bright,lamp_status:true,lamp_id:123},{
    headers: {
          'Content-Type': 'application/json'
      }
  }).then(
      res.sendStatus(200)
    )
    
    var accendiQuery = 'UPDATE lumosminima_pb.lampione SET status = ?,luminosita_impostata = ? WHERE IP = ?'
    await conn.query(accendiQuery,[1,bright,lamp_ip])


  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})

//spegni lampione
app.post('/spegniLampione', async (req, res) => {
  let conn;
  const lamp_ip = req.query.ip;
  
  
  try {
    conn = await pool.getConnection();
    var spegniQuery = 'UPDATE lumosminima_pb.lampione SET status = ? WHERE IP = ?'
    await conn.query(spegniQuery,[0,lamp_ip])

    await axios.post("http://127.0.0.1:3020/lamp",{brightness:'0',lamp_status:false,lamp_id:123},{
      headers: {
          'Content-Type': 'application/json'
      }
  }).then(
      res.sendStatus(200)
    )
    
    
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})
//elimina lampione
app.post('/eliminaLampione', async (req, res) => {
  let conn;
  const ip = req.query.ip
  
  
  try {
    conn = await pool.getConnection();
    var eliminaQuery = 'DELETE FROM lumosminima_pb.lampione WHERE IP = ?'
    await conn.query(eliminaQuery,[ip])
   
    res.sendStatus(200)
    
    
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})

//









//numero sensori a sistema
app.get('/overviewsensori/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {
    // here we make a connection to MariaDB
    conn = await pool.getConnection();

    // create a new query to fetch all records from the table
    var query = "SELECT COUNT(*) as numero_sensori from lumosminima_pb.sensore WHERE id_area_illuminata = ?";

    // we run the query and set the result to a new variable
    var rows = await conn.query(query,[id]);

    // return the results
    res.send(rows[0].numero_sensori.toString());
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
//lista sensori
app.get('/sensori/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT IP,zona_geografica,iterazione,raggio_azione,polling_time,id_area_illuminata FROM lumosminima_pb.sensore WHERE id_area_illuminata=?";

    var rows = await conn.query(query, [id]);

    res.send(rows);
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

//rimuovi sensore
app.post('/rimuoviSensore', async (req, res) => {
  let conn;
  const ip = req.query.ip
  try {
    
    conn = await pool.getConnection();
    var rimuoviQuery = "DELETE FROM lumosminima_pb.sensore WHERE IP = ?"
    var rows = await conn.query(rimuoviQuery, [ip])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})

/*
    res.contentType('application/json');
    res.send(JSON.stringify(result));
  } catch (err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

*/
//lista  amministratori
/*app.get('/amministratori', async (req, res) => {
  const id = parseInt(req.params.id)
  let conn;
  try {

    conn = await pool.getConnection();


    var query = "SELECT Username FROM lumosminima_pb.amministratore";


    var rows = await conn.query(query);

    res.send(rows);
  } catch (err) {
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
    var usernameQuery = "SELECT * FROM lumosminima_pb.amministratore WHERE Username = ?"
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
    var rimuoviQuery = "DELETE FROM lumosminima_pb.guasto WHERE id = ?"
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
    
    var idQuery = "SELECT MAX(ID) FROM lumosminima_pb.guasto";
    var id = await conn.query(idQuery);
    id = (id[0]["MAX(ID)"]) + 1

    var rimuoviQuery = "INSERT INTO lumosminima_pb.guasto (ID,zona_geografica,id_area_illuminata) VALUES(?,?,?) "
    var rows = await conn.query(rimuoviQuery, [id,zonaGeografica,idArea])
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    throw err;
  } finally {
    if (conn) return conn.release();
  }
})
*/

module.exports = app;