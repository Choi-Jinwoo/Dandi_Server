module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define("Channel", {
        id : { 
            type : DataTypes.INTEGER(45),
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        explain : {
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        create_user : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        color : {
            type : DataTypes.STRING(45),
            allowNull : true,
        },
        school_id : {
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        isPublic : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull : false,
        },
        thumbnail : {
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