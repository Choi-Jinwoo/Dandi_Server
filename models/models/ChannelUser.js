module.exports = (sequelize, DataTypes) => {
    const ChannelUser = sequelize.define("ChannelUser", {
        id: { 
            type : DataTypes.INTEGER(45),
            field: 'id',
            allowNull : false,
            primaryKey : true,
            autoIncrement : true,
        },
        user_id: {
            field: 'user_id',
            type : DataTypes.STRING(45),
            allowNull : false
        },
        channel_id: {
            field: 'channel_id',
            type : DataTypes.INTEGER(45),
            allowNull : false,
        },
        isAllowed: { 
            field: 'isAllowed',
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        pushNotify: {
            field: 'pushNotify',
            type : DataTypes.BOOLEAN,
            allowNull : false
        }
    });

    ChannelUser.associate = (models) => {
        models.ChannelUser.belongsTo(models.Channel, {
            foreignKey : "channel_id"
        })
    }
    
    return ChannelUser;
}