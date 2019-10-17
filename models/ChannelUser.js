module.exports = (sequelize, DataTypes) => {
	const ChannelUser = sequelize.define('ChannelUser', {
		id: {
			field: 'id',
			type: DataTypes.INTEGER(45),
			primaryKey: true,
			autoIncrement: true,
			allowNull: false,
		},
		user_id: {
			field: 'user_id',
			type: DataTypes.STRING(45),
			allowNull: false,
		},
		channel_id: {
			field: 'channel_id',
			type: DataTypes.INTEGER(45),
			allowNull: false,
		},
		isAllowed: {
			field: 'is_allowed',
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
		pushNotify: {
			field: 'push_notify',
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});

	ChannelUser.associate = (models) => {
		models.ChannelUser.belongsTo(models.Channel, {
			foreignKey: 'channel_id',
			onDelete: 'cascade',
		});
	}
	// ChannelUser.associate = (models) => {
	// 	models.ChannelUser.belongsTo(models.User, {
	// 		foreignKey: 'user_id',
	// 		onDelete: 'cascade',
	// 	});
	// }

	ChannelUser.getChannelUserByUser = (user_id) => ChannelUser.findAll({
		where: {
			user_id,
		},
		raw: true,
	});
	ChannelUser.getChannelUserByChannel = (channel_id) => ChannelUser.findAll({
		where: {
			channel_id,
			isAllowed: true,
		},
		raw: true,
	});
	ChannelUser.getChannelByAllowedUser = (user_id) => ChannelUser.findAll({
		where: {
			user_id,
			isAllowed: true,
		},
		raw: true,
	});
	ChannelUser.isMember = (user_id, channel_id) => ChannelUser.findOne({
		where: {
			user_id,
			channel_id,
			isAllowed: true,
		},
		raw: true,
	});
	ChannelUser.getChannelUserByUserAndChannel = (user_id, channel_id) => ChannelUser.findOne({
		where: {
			user_id,
			channel_id,
		},
		raw: true,
	});
	ChannelUser.awaitUser = (channel_id) => ChannelUser.findAll({
		where: {
			channel_id,
			isAllowed: false,
		},
		raw: true,
	});
	ChannelUser.joinChannel = (data) => ChannelUser.create({
		user_id: data.user_id,
		channel_id: data.channel_id,
		isAllowed: data.isAllowed,
		pushNotify: data.pushNotify,
	});
	ChannelUser.allowUser = (user_id, channel_id) => ChannelUser.update({
		isAllowed: true,
	}, {
		where: {
			user_id,
			channel_id,
		},
	});
	ChannelUser.rejectUser = (user_id, channel_id) => ChannelUser.destroy({
		where: {
			user_id,
			channel_id,
			isAllowed: false,
		},
	});
	ChannelUser.deleteChannelUser = (user_id, channel_id) => ChannelUser.destroy({
		where: {
			user_id,
			channel_id,
		},
	});
	ChannelUser.deleteChannelUserByChannel = (channel_id) => ChannelUser.destroy({
		where: {
			channel_id,
		}
	});
	ChannelUser.leaveChannel = (user_id, channel_id) => ChannelUser.destroy({
		where: {
			user_id,
			channel_id,
		},
	});

	return ChannelUser;
}