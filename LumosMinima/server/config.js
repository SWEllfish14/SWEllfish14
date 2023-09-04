module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "SWEllfish14",
    DB: "lumosminima_pb",
    dialect: "mariadb",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }