const Joi = require('@hapi/joi');

exports.validateMemberSignup = async (body) => {
  const schema = Joi.object().keys({
    user_id: Joi.string().required(),
    user_pw: Joi.string().required(),
    user_name: Joi.string().required(),
    permission: Joi.number().integer(),
    user_email: Joi.string().required(),
    user_phone: Joi.string(),
    school: Joi.string().required(),
    school_grade: Joi.number().integer(),
    school_class: Joi.number().integer(),
    profile_pic: Joi.string(),
    pushNotify: Joi.boolean().required(),
    isPublic: Joi.boolean().required(),
    isAllowed: Joi.boolean().required()
  });
  try {
    return await Joi.validate(body, schema);
  } catch (err) {
    throw err;
  }
};

exports.validateAddEvent = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string(),
    start_date: Joi.date().required(),
    end_date: Joi.date().required(),
    author: Joi.string().required(),
    channel_id: Joi.number().integer().required()
  });
  try {
    await Joi.validate(body, schema);
    if (body.start_date.substr(0, 4) < body.end_date.substr(0, 4)) {
      return;
    } else if (body.start_date.substr(0, 4) > body.end_date.substr(0, 4)) {
      throw err;
    }
    if (body.start_date.substr(5, 2) < body.end_date.substr(5, 2)) {
      return;
    } else if (body.start_date.substr(5, 2) > body.end_date.substr(5, 2)) {
      throw err;
    }
    if (body.start_date.substr(8, 2) < body.end_date.substr(8, 2)) {
      return;
    } else if (body.start_date.substr(8, 2) > body.end_date.substr(8, 2)) {
      throw err;
    }
    
    return;
  } catch (err) {
    throw err;
  }
};

exports.validateUpdateEvent = async (body) => {
  const schema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string(),
    start_date: Joi.date(),
    end_date: Joi.date(),
    author: Joi.string(),
    origin_start_date: Joi.date().required(),
    origin_end_date: Joi.date().required(),
  });
  try {
    await Joi.validate(body, schema);
    if (body.start_date.substr(0, 4) < body.end_date.substr(0, 4)) {
      return;
    } else if (body.start_date.substr(0, 4) > body.end_date.substr(0, 4)) {
      throw err;
    }
    if (body.start_date.substr(5, 2) < body.end_date.substr(5, 2)) {
      return;
    } else if (body.start_date.substr(5, 2) > body.end_date.substr(5, 2)) {
      throw err;
    }
    if (body.start_date.substr(8, 2) < body.end_date.substr(8, 2)) {
      return;
    } else if (body.start_date.substr(8, 2) > body.end_date.substr(8, 2)) {
      throw err;
    }
    
    return;
  } catch (err) {
    throw err;
  }
};

exports.validateAddChannel = async (body) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    explain: Joi.string().required(),
    isPublic: Joi.boolean().required(),
    school_id: Joi.string().required(),
    create_user: Joi.string().required(),
    color: Joi.string(),
    thumbnail: Joi.string()
  });
  try {
    return await Joi.validate(body, schema);
  } catch (err) {
    throw err;
  }
};

exports.validateUpdateChannel = async (body) => {
  const schema = Joi.object().keys({
    isPublic: Joi.string(),
    color: Joi.string(),
    explain: Joi.string(),
  });
  try {
    return await Joi.validate(body, schema);
  } catch (err) {
    throw err;
  }
};
