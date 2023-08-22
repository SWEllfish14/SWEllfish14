module.exports = (sequelize, Sequelize) => {
    const Area = sequelize.define("area_illuminata", {
        
        ID: {
            type: Sequelize.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            unique: true,
            
        },
        città: {
            type: Sequelize.STRING(128),
            allowNull: false,
            defaultValue: ''
        },
        zona_geografica_città: {
            type: Sequelize.STRING(128),
            allowNull: false,
            defaultValue: ''
        },
        modalità_funzionamento: {
            type: Sequelize.STRING(1),
            allowNull: false,
            defaultValue: ''
        },
        luminosità_standard: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        luminosità_rilevamento: {
            type: Sequelize.INTEGER(11),
            allowNull: false
        },
        luminosità_manuale: {
            type: Sequelize.INTEGER(11),
            defaultValue: null
        },
        stato: {
            type: Sequelize.INTEGER(11),
            defaultValue: null
        },
    },{
        timestamps: false,
    });
    
    return Area;
};