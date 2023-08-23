const createServer =require("./server.js");
const app = createServer();
const PORT = process.env.PORT || 3002; 
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

