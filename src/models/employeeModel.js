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
        unique: true,
        validate: {
            isEmail: true
        }
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
        allowNull: false,
        references: {
            model: 'departments',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    designation: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'designations',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
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
        allowNull: false,
        unique: true
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
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
    },
    client_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'clients',
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
    tableName: 'employees',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

// Hook for generating employee ID
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
        where: { client_id: employee.client_id },
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

// Define associations
Employee.associate = (models) => {
    Employee.belongsTo(models.Department, {
        foreignKey: 'department',
        as: 'departmentInfo'
    });

    Employee.belongsTo(models.Designation, {
        foreignKey: 'designation',
        as: 'designationInfo'
    });

    Employee.belongsTo(models.Role, {
        foreignKey: 'role',
        as: 'roleInfo'
    });

    Employee.belongsTo(models.Client, {
        foreignKey: 'client_id',
        as: 'client'
    });

    Employee.hasMany(models.Attendance, {
        foreignKey: 'employee_id',
        as: 'attendance'
    });

    Employee.hasMany(models.Leave, {
        foreignKey: 'employee_id',
        as: 'leaves'
    });
};

export default Employee;
