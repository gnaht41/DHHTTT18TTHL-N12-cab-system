const User = require("../models/user.model");

exports.findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
};

exports.findById = async (id) => {
    return await User.findByPk(id);
};

exports.createUser = async (data) => {
    return await User.create(data);
};