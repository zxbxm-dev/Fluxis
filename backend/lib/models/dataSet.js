const moment = require("moment")

module.exports = ( sequelize, DataTypes ) => {
    const dataSet = sequelize.define(
        "dataSet",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey : true,
                autoIncrement: true,
                allowNull: false, 
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                references:{
                    model: 'user',
                    key: 'name'
                },
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isGoggleOn: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isHelmetOn:{
                type: DataTypes.BOOLEAN,
                allowNull: false,
            },
            isShoesOn: {
                type: DataTypes.BOOLEAN,
                allowNull: false,                
            },
            equipStatus: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE, 
                allowNull: false,
                get(){
                    const rawCreatedAt = this.getDataValue('createdAt');
                    const formattedDate = moment(rawCreatedAt).format("YYYY-MM-DD HH:mm:ss");
                    return formattedDate;
                }
            },
            
        },
        {
         tableName : "dataSet"
        }
    );
    return dataSet;
}