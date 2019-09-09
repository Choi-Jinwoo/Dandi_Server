module.exports = (sequelize, DataTypes) => {
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
        user_name : { //fk
            type : DataTypes.STRING(45),
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
            type : DataTypes.INTEGER,
            allowNull: true
        },
        school_class : {
            type : DataTypes.INTEGER,
            allowNull: true
        },
        profile_pic : {
            type : DataTypes.STRING(500),
            allowNull : true
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

    User.associate = (models) => {
        models.User.hasMany(models.ChannelEvent, {
            foreignKey : "channel_id"
        })
    }
    return User;
}