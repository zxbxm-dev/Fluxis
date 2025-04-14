module.exports = ( sequelize, DataTypes ) => {
    const user = sequelize.define(
        "user",
        {
            id:{
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement : true,
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique : true,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            token: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        },
        {
            tableName: 'user',
        }
    );

    return user;
}