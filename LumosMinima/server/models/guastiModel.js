module.exports = (sequelize, Sequelize) => {
    const Guasto = sequelize.define("guasto", {
        
        ID: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            
        },
        data_rilevamento: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: ''
        },
        stato: {
            type: Sequelize.CHAR(1),
            allowNull: false,
            defaultValue: null
        },
        id_area_illuminata: {
            type: Sequelize.INTEGER(11),
            allowNull: false,
            defaultValue: ''
        },
        data_risoluzione: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            defaultValue: null
        }
    },{
        timestamps : false,
        freezeTableName : true
    });
    
    return Guasto;
};