module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define("User", {
        user_id : { //fk
            type : DataTypes.STRING(45),
            primaryKey : true,
            autoIncrement : false,
            allowNull : false
        }, 
        user_pw : {
            type : DataTypes.STRING,
            allowNull : false
        },
        permission : {
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        user_email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        user_phone : {
            type : DataTypes.STRING(45)
        },
        school : { //fk
            type : DataTypes.STRING(45),
            allowNull : false
        },
        school_grade : {
            type : DataTypes.INTEGER
        },
        school_class : {
            type : DataTypes.INTEGER,
        },
        profile_pic : {
            type : DataTypes.STRING(500)
        },
        pushNotify : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        isPublic : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        isAllowed : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue : false
        }
    })

    return User;
}