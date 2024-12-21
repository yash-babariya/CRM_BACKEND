import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import generateId from '../middlewares/generatorId.js';

class Leave extends Model { }

Leave.init({
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: generateId
    },
    employee_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    leaveType: {
        type: DataTypes.ENUM('sick', 'casual', 'annual', 'other'),
        allowNull: false
    },
    reason: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending'
    },
    admin_remarks: {
        type: DataTypes.TEXT
    },
    created_by: {
        type: DataTypes.STRING,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    updated_by: {
        type: DataTypes.STRING,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Leave',
    tableName: 'leaves',
    timestamps: true
});

// Define associations
Leave.associate = (models) => {
    Leave.belongsTo(models.User, {
        foreignKey: 'employee_id',
        as: 'employee'
    });
    Leave.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'creator'
    });
    Leave.belongsTo(models.User, {
        foreignKey: 'updated_by',
        as: 'updater'
    });
};

export default Leave; 