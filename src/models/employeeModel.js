import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import generateId from '../middlewares/generatorId.js';

const Employee = sequelize.define('Employee', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        unique: true,
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
    joiningDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    leaveDate: {
        type: DataTypes.DATE,
        allowNull: true
    },
    employeeId: {
        type: DataTypes.STRING,
        unique: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    accountholder: {
        type: DataTypes.STRING,
        allowNull: false
    },
    accountnumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    bankname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ifsc: {
        type: DataTypes.STRING,
        allowNull: false
    },
    banklocation: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cv_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    photo_path: {
        type: DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'employee',
        allowNull: false
    }
}, {
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

Employee.beforeCreate(async (employee) => {
    // Handle main ID
    let isUnique = false;
    let newId;
    while (!isUnique) {
        newId = generateId();
        const existingEmployee = await Employee.findOne({
            where: { id: newId }
        });
        if (!existingEmployee) {
            isUnique = true;
        }
    }
    employee.id = newId;

    // Handle employeeId generation
    const lastEmployee = await Employee.findOne({
        order: [['employeeId', 'DESC']]
    });

    let nextNumber = 1;
    if (lastEmployee && lastEmployee.employeeId) {
        // Extract the number from the last employeeId and increment it
        const lastNumber = parseInt(lastEmployee.employeeId.replace('EMP', ''));
        nextNumber = lastNumber + 1;
    }

    // Format the new employeeId with leading zeros
    employee.employeeId = `EMP${String(nextNumber).padStart(3, '0')}`;
});

export default Employee;