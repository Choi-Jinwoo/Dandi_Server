module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        user_id : {
            field : "user_id",
            type : DataTypes.STRING(45),
            primaryKey : true,
            autoIncrement : false,
            allowNull : false,
        }, 
        user_pw : {
            field : "user_pw",
            type : DataTypes.STRING,
            allowNull : false,
        },
        user_name : {
            field : "user_name",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        permission : {
            field : "permission",
            type : DataTypes.INTEGER,
            allowNull : false,
        },
        user_email : {
            field : "user_email",
            type : DataTypes.STRING,
            allowNull : false,
        },
        user_phone : {
            field : "user_phone",
            type : DataTypes.STRING(45),
            allowNull : true,
        },
        school : {
            field : "school",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        school_grade : {
            field : "school_grade",
            type : DataTypes.INTEGER,
            allowNull: true,
        },
        school_class : {
            field : "school_class",
            type : DataTypes.INTEGER,
            allowNull: true,
        },
        profile_pic : {
            field : "profile_pic",
            type : DataTypes.STRING(500),
            allowNull : true,
        },
        pushNotify : {
            field : "pushNotify",
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        isPublic : {
            field : "isPublic",
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        isAllowed : {
            field : "isAllowed",
            type : DataTypes.BOOLEAN,
            defaultValue : false,
            allowNull : false,
        }
    })

    User.associate = (models) => {
        models.User.hasMany(models.ChannelEvent, {
            foreignKey : "channel_id"
        })
    }
    return User;
}