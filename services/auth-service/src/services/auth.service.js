const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repository");
const redisClient = require("../config/redis");

const generateAccessToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

const generateRefreshToken = (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.REFRESH_EXPIRES_IN,
    });

exports.register = async ({ email, password, role }) => {
    const existingUser = await userRepo.findByEmail(email);
    if (existingUser) throw new Error("Email already exists");

    const hashedPassword = await bcrypt.hash(password, 10);

    return await userRepo.createUser({
        email,
        password_hash: hashedPassword,
        role: role || "CUSTOMER",
    });
};

exports.login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken({
        id: user.id,
        role: user.role,
    });

    const refreshToken = generateRefreshToken({
        id: user.id,
    });

    // Lưu refresh token vào Redis
    await redisClient.set(user.id, refreshToken, {
        EX: 7 * 24 * 60 * 60, // 7 ngày
    });

    return { accessToken, refreshToken };
};

exports.refreshToken = async (refreshToken) => {
    if (!refreshToken) throw new Error("No refresh token provided");

    let decoded;
    try {
        decoded = jwt.verify(refreshToken, process.env.JWT_SECRET);
    } catch {
        throw new Error("Invalid refresh token");
    }

    const storedToken = await redisClient.get(decoded.id);

    if (storedToken !== refreshToken)
        throw new Error("Refresh token not valid");

    // Rotate token
    const newAccessToken = generateAccessToken({
        id: decoded.id,
    });

    const newRefreshToken = generateRefreshToken({
        id: decoded.id,
    });

    await redisClient.set(decoded.id, newRefreshToken, {
        EX: 7 * 24 * 60 * 60,
    });

    return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
    };
};