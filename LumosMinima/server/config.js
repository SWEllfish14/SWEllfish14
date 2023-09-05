module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "SWEllfish14",
    DB: "lumosminima_pb",
    dialect: "mariadb",
    pool: {
      max: 5,
      min: 0,
      acquire: 2000,
      idle: 2000
    }
  }