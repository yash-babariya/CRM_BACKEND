import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role_description: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'roles',
    timestamps: true
});

export default Role;