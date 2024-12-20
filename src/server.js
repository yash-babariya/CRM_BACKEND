import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import sequelize from "./config/db.js";
import responseHandler from "./utils/responseHandler.js";
import cors from "cors";

const app = express();

app.use(cors({ origin: '*' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    responseHandler.success(res, 200, "Server is running");
});

app.use("/api/v1/", routes);

const syncDatabase = async () => {
    try {
        // Sync tables in specific order
        await sequelize.sync({ force: false });
    } catch (error) {
        console.error('Error syncing database:', error);
        console.error('Detailed error:', error.original);
    }
};

syncDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

