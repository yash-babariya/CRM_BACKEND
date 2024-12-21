import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const ClientSubscription = sequelize.define('ClientSubscription', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    plan_id: {
        type: DataTypes.STRING,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    start_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end_date: {
        type: DataTypes.DATE,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'trial', 'expired', 'cancelled'),
        defaultValue: 'trial'
    },
    current_storage_used: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    payment_status: {
        type: DataTypes.ENUM('pending', 'completed', 'failed'),
        defaultValue: 'pending'
    },
    last_payment_date: {
        type: DataTypes.DATE,
        allowNull: true
    }
});

export default ClientSubscription; 