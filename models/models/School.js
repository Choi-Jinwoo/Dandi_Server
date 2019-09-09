module.exports = (sequelize, DataTypes) => {
    const School = sequelize.define("School", {
        id : { //school_id
            type : DataTypes.STRING(45),
            allowNull : false,
            primaryKey : true
        },
        name : { //school_name
            type : DataTypes.STRING(45),
            allowNull : false
        },
        type : { //school_kind
            type : DataTypes.STRING(45),
            allowNull : false
        },
        office_code : {
            type : DataTypes.STRING(45),
            allowNull : false
        }
    })

    return School;
}