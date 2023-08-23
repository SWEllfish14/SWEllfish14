const express = require("express"); 
const cors = require("cors");
const areaRouter = require("./routes/areaRoutes")
const guastoRouter = require("./routes/guastoRoutes")
const lampioneRouter = require("./routes/lampioneRoutes")
const sensoreRouter = require("./routes/sensoreRoutes")

function createServer() {
    
const app = express(); 

app.use(cors());
app.use(express.json())
app.use("/", areaRouter);
app.use("/",guastoRouter);
app.use("/",lampioneRouter);
app.use("/",sensoreRouter);
return app
  }
  
module.exports = createServer
