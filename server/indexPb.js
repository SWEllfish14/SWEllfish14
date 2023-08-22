const express = require("express"); 
const cors = require("cors");
const areaRouter = require("./routes/areaRoutes")
const guastoRouter = require("./routes/guastoRoutes")
const lampioneRouter = require("./routes/lampioneRoutes")
//const sensoreRouter = require("./routes/sensoreRoutes")
const app = express(); 
const PORT = process.env.PORT || 3002; 
app.use(cors());
app.use(express.json())
app.use("/", areaRouter);
app.use("/",guastoRouter);
app.use("/",lampioneRouter);
//app.use("/",sensoreRouter);
app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

const db = require("./models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });