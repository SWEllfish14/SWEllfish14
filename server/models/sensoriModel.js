module.exports = (sequelize, Sequelize) => {
    const Sensore = sequelize.define("sensore", {
        
        ID: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            
        },
        IP: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: ''
        },
        polling_time: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        }
        ,
        zona_geografica_posizionamento: {
            type: Sequelize.STRING(50),
            allowNull: false,
        }
        ,
        tipo_interazione: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        raggio_azione: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
        },
        id_area_illuminata: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
    
    return Sensore;
};