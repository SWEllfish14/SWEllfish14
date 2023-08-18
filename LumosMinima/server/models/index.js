const dbConfig = require("../config.js");

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.aree = require("./areeModel")(sequelize, Sequelize);
db.guasti = require("./guastiModel")(sequelize,Sequelize);
db.lampioni = require("./lampioniModel")(sequelize,Sequelize);
db.sensori = require("./sensoriModel.js")(sequelize,Sequelize);

db.aree.hasMany(db.guasti,{ as: 'guasti', foreignKey: 'id_area_illuminata', onDelete: 'cascade',
hooks: true, });
db.guasti.belongsTo(db.aree,{ as: 'area', foreignKey: 'id_area_illuminata'});
db.aree.hasMany(db.lampioni,{ as: 'lampioni', foreignKey: 'id_area_illuminata', onDelete: 'cascade',
hooks: true, })
db.lampioni.belongsTo(db.aree,{ as: 'area', foreignKey: 'id_area_illuminata'});
db.aree.hasMany(db.sensori,{ as: 'sensori', foreignKey: 'id_area_illuminata', onDelete: 'cascade',
hooks: true, })
db.sensori.belongsTo(db.aree,{ as: 'area', foreignKey: 'id_area_illuminata'});

module.exports = db;