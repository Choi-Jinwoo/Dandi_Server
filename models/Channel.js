module.exports = (sequelize, DataTypes) => {
    const Channel = sequelize.define('Channel', {
        id : { 
            field : 'id',
            type : DataTypes.INTEGER(45),
            primaryKey : true,
            autoIncrement : true,
            allowNull : false,
        },
        name : {
            field : 'name',
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        explain : {
            field : 'explain',
            type : DataTypes.STRING(100),
            allowNull : false,
        },
        create_user : {
            field : 'create_user',
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        color : {
            field : 'color',
            type : DataTypes.STRING(45),
            allowNull : true,
        },
        school_id : {
            field : 'school_id',
            type : DataTypes.STRING(45),
            allowNull : false,
        },
        isPublic : {
            field : 'is_public',
            type : DataTypes.BOOLEAN,
            allowNull : false,
        },
        createdAt: {
            field : 'created_at',
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull : false,
        },
        thumbnail : {
            field : 'thumbnail',
            type : DataTypes.STRING(500),
            allowNull : true,
        },
    })

    Channel.associate = (models) => {
        models.Channel.hasMany(models.ChannelUser, {
            foreignKey : 'channel_id'
        })
    }

    Channel.associate = (models) => {
        models.Channel.hasMany(models.ChannelEvent, {
            foreignKey : 'channel_id'
        })
    }

    Channel.associate = (models) => {
        models.Channel.belongsTo(models.User, {
            foreignKey : 'create_user'
        });
    }

    Channel.getChannel = (id) => Channel.findOne({
        where : {
            id,
        },
        raw : true,
    });

    Channel.getChannelBySchool = (school_id) => Channel.findAll({
        where : {
            school_id,
        },
        raw : true,
    });

    Channel.getChannelByNameAndSchool = (channel_name, school_id) => Channel.findAll({
        where : {
            name : { [models.Sequelize.Op.like] : '%' + channel_name + '%' },
            school_id,
        },
        raw : true,
    });

    Channel.getChannelByCreateUser = (create_user) => Channel.findAll({
        where : {
            create_user,
        },
        raw : true,
    });

    Channel.getChannelForCreate = (school_id, name) => Channel.findOne({
        where : {
            school_id,
            name,
        },
        raw : true,
    })

    Channel.isFounder = (create_user, id) => Channel.findOne({
        where : {
            id,
            create_user,
        }
    });

    Channel.createChannel = (data) => Channel.create({
        name : data.name,
        explain : data.explain,
        create_user : data.create_user,
        color : data.color,
        school_id : data.school_id,
        isPublic : data.isPublic,
        thumbnail : data.thumbnail,
    });

    Channel.deleteChannel = (id) => Channel.destroy({
        where : {
            id,
        }
    });

    Channel.updateChannel = (id, data) => Channel.update(data, {
        where : {
            id,
        },
    });

    Channel.updateThumbnail = (id, thumbnail) => Channel.update({
        thumbnail,
    }, {
        where : {
            id,
        }
    });

    return Channel;
}