import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Client from './clientModel.js';
import Role from './roleModel.js';
import Department from './departmentModel.js';
import Designation from './designationModel.js';
import Employee from './employeeModel.js';

// Role Associations
Role.hasMany(Employee, {
    foreignKey: 'role_id',
    onDelete: 'CASCADE'
});

// Client Associations
Client.hasMany(Department, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Client.hasMany(Designation, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

Client.hasMany(Employee, {
    foreignKey: 'client_id',
    onDelete: 'CASCADE'
});

// Department Associations
Department.belongsTo(Client, {
    foreignKey: 'client_id'
});

Department.hasMany(Employee, {
    foreignKey: 'department_id',
    onDelete: 'CASCADE'
});

// Designation Associations
Designation.belongsTo(Client, {
    foreignKey: 'client_id'
});

Designation.hasMany(Employee, {
    foreignKey: 'designation_id',
    onDelete: 'CASCADE'
});

// Employee Associations
Employee.belongsTo(Department, {
    foreignKey: 'department_id'
});

Employee.belongsTo(Designation, {
    foreignKey: 'designation_id'
});

Employee.belongsTo(Role, {
    foreignKey: 'role_id'
});

Employee.belongsTo(Client, {
    foreignKey: 'client_id'
});

// Export models
export {
    Role,
    Client,
    Department,
    Designation,
    Employee
};