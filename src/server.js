import express from "express";
import { PORT } from "./config/config.js";
import routes from "./routes/index.js";
import sequelize from "./config/db.js";
import responseHandler from "./utils/responseHandler.js";
import cors from "cors";
import { Role, Client, Department, Designation, Employee } from "./models/index.js";

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
        // Drop all tables first
        await sequelize.drop();

        // Create tables in correct order
        await Role.sync();
        await Client.sync();
        await Department.sync();
        await Designation.sync();
        await Employee.sync();

        console.log('Database synced successfully');
    } catch (error) {
        console.error('Error syncing database:', error);
        console.error('Detailed error:', error.original);
    }
};

syncDatabase();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

