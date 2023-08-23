const createServer =require("./server.js");
const app = createServer();


const db = require("./models/index");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

