const { response } = require('express');
const mariadb = require('mariadb');
const pool = mariadb.createPool({ host: 'localhost', 
user: 'root', 
password:'SWEllfish14',
connectionLimit: 100 });



module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }