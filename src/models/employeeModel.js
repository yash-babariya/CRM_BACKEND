import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    department_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

export default Employee;
