const Joi = require('@hapi/joi');

exports.validateMemberSignup = async (body) => {
	const schema = Joi.object().keys({
		user_id : Joi.string().required(),
		user_pw : Joi.string().required(),
		user_name : Joi.string().required(),
		permission : Joi.number().integer(),
		user_email : Joi.string().required(),
		user_phone : Joi.string(),
		school : Joi.string().required(),
		school_grade : Joi.number().integer(),
		school_class : Joi.number().integer(),
		profile_pic : Joi.string(),
		pushNotify : Joi.boolean().required(),
		isPublic : Joi.boolean().required(),
		isAllowed : Joi.boolean().required()
	});

	try {
		return await Joi.validate(body, schema);
	} catch(err) {
		throw err;
	}
}

exports.validateAddEvent = async (body) => {
	const schema = Joi.object().keys({
		title : Joi.string().required(),
		start_date : Joi.date().required(),
		end_date : Joi.date().required(),
		author : Joi.string().required(),
		content : Joi.string(),
		channel_id : Joi.number().integer().required(),
	});

	try {
		return await Joi.validate(body, schema);
	} catch(err) {
		throw err;
	}
}

exports.validateUpdateEvent = async (body) => {
	const schema = Joi.object().keys({
		title : Joi.string(),
		start_date : Joi.date(),
		end_date : Joi.date(),
		author : Joi.string(),
		channel_id : Joi.number().integer(),
	});

	try {
		return await Joi.validate(body, schema);
	} catch(err) {
		throw err;
	}
}

exports.validateAddChannel = async (body) => {
	const schema = Joi.object().keys({
		name : Joi.string().required(),
		explain : Joi.string().required(),
		isPublic : Joi.boolean().required(),
		school_id : Joi.string().required(),
		create_user  : Joi.string().required(),
		color : Joi.string(),
		thumbnail : Joi.string(),
	});

	try {
		return await Joi.validate(body, schema);
	} catch(err) {
		
		throw err;
	}
}

exports.validateUpdateChannel = async (body) => {
	const schema = Joi.object().keys({
		title : Joi.string(),
		start_date : Joi.date(),
		end_date : Joi.date(),
		author : Joi.string().required(),
	});

	try {
		return await Joi.validate(body, schema);
	} catch(err) {
		throw err;
	}
}