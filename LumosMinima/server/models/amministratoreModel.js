

module.exports = (sequelize, Sequelize) => {
    const Amministratore = sequelize.define("amministratore", {
        
        nome_utente: {
            type:  Sequelize.STRING(128),
            primaryKey: true,
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false,
        },
        tipo: {
            type: Sequelize.STRING(1),
            allowNull: false,
        },
        comune_afferenza: {
            type:Sequelize.STRING(128),
            allowNull: true,
        },
        
    },{
        timestamps : false,
        freezeTableName : true
    });
    
    return Amministratore;
};