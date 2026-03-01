require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
const redisClient = require("./config/redis");

const startServer = async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected successfully");

        await redisClient.connect();
        console.log("Redis connected");

        await sequelize.sync();
        console.log("All models synchronized");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });

    } catch (error) {
        console.error("Error starting server:", error);
    }
};

startServer();