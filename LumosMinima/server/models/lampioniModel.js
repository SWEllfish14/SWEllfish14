module.exports = (sequelize, Sequelize) => {
    const Lampione = sequelize.define("lampione", {
        
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
        tipo_interazione: {
            type: Sequelize.STRING(50),
            allowNull: false,
            defaultValue: null
        },
        luminosità_default: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: ''
        },
        luminosità_impostata: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: ''
        },
        status: {
            type: Sequelize.INTEGER(1),
            allowNull: false,
            defaultValue: 0
        },
        id_area_illuminata: {
            type: Sequelize.INTEGER(10),
            allowNull: false,
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
    
    return Lampione;
};