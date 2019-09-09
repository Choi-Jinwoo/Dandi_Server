module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define("Channel", {
        id : { 
            field : "id",
            type : DataTypes.INTEGER(45),
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : {
            field : "name",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        explain : {
            field : "explain",
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        create_user : {
            field : "create_user",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        color : {
            field : "color",
            type : DataTypes.STRING(45),
            allowNull : true,
        },
        school_id : {
            field : "school_id",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        isPublic : {
            field : "isPublic",
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        created_at: {
            field : "created_at",
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull : false,
        },
        thumbnail : {
            field : "thumbnail",
            type : DataTypes.STRING(500),
            allowNull : true,
        },
    })

    Channel.associate = (models) => {
        models.Channel.hasMany(models.ChannelUser, {
            foreignKey : "channel_id"
        })
    }

    Channel.associate = (models) => {
        models.Channel.hasMany(models.ChannelEvent, {
            foreignKey : "channel_id"
        })
    }

    return Channel;
}