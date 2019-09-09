module.exports = (sequelize, DataTypes) => {
    const ChannelEvent = sequelize.define("ChannelEvent", {
        id: { 
            field: "id",
            type : DataTypes.INTEGER(45),
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        channel_id: {
            field: "channel_id",
            type : DataTypes.INTEGER(45),
            allowNull : false,
        },
        title: {
            field: "title",
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        start_date: { 
            field: "start_date",
            type: DataTypes.DATE,
            allowNull: false,
        },
        end_date: {
            field: "end_date",
            type : DataTypes.DATE,
            allowNull : false,
        },
        author: {
            field: "author",
            type : DataTypes.STRING(45),
            allowNull : false,
        }
    });

    ChannelEvent.associate = (models) => {
        models.ChannelEvent.belongsTo(models.Channel, {
            foreignKey : "channel_id"
        })
    }
    
    ChannelEvent.associate = (models) => {
        models.ChannelEvent.belongsTo(models.User, {
            foreignKey : "author"
        })
    }
    return ChannelEvent;
}