import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Role = sequelize.define('Role', {
    role_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
        defaultValue: () => generateId()
    },
    role_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        defaultValue: 'user'
    },
});

Role.beforeCreate(async (role) => {
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        // Check if this ID already exists
        const existingRole = await Role.findOne({
            where: { role_id: newId }
        });
        if (!existingRole) {
            isUnique = true;
        }
    }

    role.role_id = newId;
});

export default Role;