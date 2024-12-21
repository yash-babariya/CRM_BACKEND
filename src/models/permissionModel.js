import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Permission = sequelize.define('Permission', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('active', 'inactive'),
        defaultValue: 'active',
        allowNull: false
    },
    created_by: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_by: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Ensure unique permission_id before creating
Permission.beforeCreate(async (permission) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        // Check if this ID already exists
        const existingPermission = await Permission.findOne({
            where: { id: newId }
        });
        if (!existingPermission) {
            isUnique = true;
        }
    }
    permission.id = newId;
});

export default Permission;
