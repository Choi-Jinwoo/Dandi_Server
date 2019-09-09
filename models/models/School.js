module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define("School", {
        id : {
            type : DataTypes.STRING(45),
            primaryKey : true,
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        type : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        office_code : {
            type : DataTypes.STRING(45),
            allowNull : false,
        }
    })

    return School;
}