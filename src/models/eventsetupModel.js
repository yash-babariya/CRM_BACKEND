import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import generateId from "../middlewares/generatorId.js";


const EventSetup = sequelize.define('EventSetup', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    EventTitle: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EventManager: {
        type: DataTypes.STRING,
        allowNull: false
    },
    EventDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    EventTime: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
export default EventSetup;