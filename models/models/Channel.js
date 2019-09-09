module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define("Channel", {
        id : { 
            type : DataTypes.INTEGER(45),
            allowNull : false,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataTypes.STRING(45),
            allowNull : false
        },
        explain : {
            type : DataTypes.STRING(100),
            allowNull : false
        },
        create_user : {
            type : DataTypes.STRING(45),
            allowNull : false
        },
        color : {
            type : DataTypes.STRING(45),
        },
        school_id : {
            type : DataTypes.STRING(45),
            allowNull : false
        },
        isPublic : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull : false
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