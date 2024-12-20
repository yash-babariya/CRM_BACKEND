import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Department = sequelize.define('Department', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
    defaultValue: () => generateId()
  },
  department_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  client_id: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: null
  }
}, {
  timestamps: true
});


Department.beforeCreate(async (department) => {
  let isUnique = false;
  let newId;

  while (!isUnique) {
    newId = generateId();
    // Check if this ID already exists
    const existingDepartment = await Department.findOne({
      where: { id: newId }
    });
    if (!existingDepartment) {
      isUnique = true;
    }
  }

  department.id = newId;
});

export default Department;