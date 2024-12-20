import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const RolePermission = sequelize.define('RolePermission', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        defaultValue: () => generateId()
    },
    role_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    permission_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'permissions',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active'
    }
}, {
    tableName: 'role_permissions',
    timestamps: true
});

export default RolePermission; 