const authService = require("../services/auth.service");

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body);
        res.json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const tokens = await authService.refreshToken(refreshToken);
        res.json(tokens);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};