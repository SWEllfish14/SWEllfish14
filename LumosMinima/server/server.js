const express = require("express"); 
const cors = require("cors");
const areaRouter = require("./routes/areaRoutes")
const guastoRouter = require("./routes/guastoRoutes")
const lampioneRouter = require("./routes/lampioneRoutes")
const sensoreRouter = require("./routes/sensoreRoutes")
const authenticationRouter = require("./routes/authenticationRoutes")
const cron = require('node-cron');
const axios = require('axios');
const sensoriService = require("./services/sensoreService")

const updateUrl = 'http://127.0.0.1:4205/sensor'; // Replace with your update API URL
const interval = 0.5; // Interval in minutes

function checkForUpdate() {
  console.log('Checking for updates...');
  axios.post(updateUrl,{
      "sensor_id": " 1",
      "range_detection": "25",
      "sensor_detection": false
  })
  
 axios.get(updateUrl)
  
    .then(response => {
      
      //console.log('Update response:', response.data);
      console.log(response.data.sensor_id)
      console.log(response.data.sensor_detection)
      if(response.data.sensor_detection === true){
        console.log("ok ho un rilevamento")
        const areaID = sensoriService.getAllSensoriFromArea(response.data.sensor_id)
        console.log(areaID)
      }
      else{
        console.log("ok, niente rilevamenti")
      }

    })
    .catch(error => {
      console.error('Error checking for updates:', error.message);
    });

  }
function createServer() {
    
const app = express(); 

app.use(cors());
app.use(express.json())
app.use("/", areaRouter);
app.use("/",guastoRouter);
app.use("/",lampioneRouter);
app.use("/",sensoreRouter);
app.use("/",authenticationRouter);
return app
  }
  
module.exports = createServer
