import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';
import Client from './clientModel.js';
import Role from './roleModel.js';
import Department from './departmentModel.js';
import Designation from './designationModel.js';
import Employee from './employeeModel.js';
import SubscriptionPlan from './subscriptionPlanModel.js';
import ClientSubscription from './clientSubscriptionModel.js';

// Client Associations
Client.hasMany(Department, {
    foreignKey: 'client_id',
    as: 'departments'
});

Client.hasMany(Designation, {
    foreignKey: 'client_id',
    as: 'designations'
});

Client.hasMany(Employee, {
    foreignKey: 'client_id',
    as: 'employees'
});

// Department Associations
Department.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

Department.hasMany(Employee, {
    foreignKey: 'department',
    as: 'employees'
});

// Designation Associations
Designation.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

Designation.hasMany(Employee, {
    foreignKey: 'designation',
    as: 'employees'
});

// Employee Associations
Employee.belongsTo(Department, {
    foreignKey: 'department',
    as: 'departmentInfo'
});

Employee.belongsTo(Designation, {
    foreignKey: 'designation',
    as: 'designationInfo'
});

Employee.belongsTo(Role, {
    foreignKey: 'role',
    as: 'roleInfo'
});

Employee.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

// Subscription Associations
Client.hasMany(ClientSubscription, {
    foreignKey: 'client_id',
    as: 'subscriptions'
});

SubscriptionPlan.hasMany(ClientSubscription, {
    foreignKey: 'plan_id',
    as: 'subscriptions'
});

ClientSubscription.belongsTo(Client, {
    foreignKey: 'client_id',
    as: 'client'
});

ClientSubscription.belongsTo(SubscriptionPlan, {
    foreignKey: 'plan_id',
    as: 'plan'
});

// Export models in order of dependency
export {
    Role,
    Client,
    Department,
    Designation,
    Employee,
    SubscriptionPlan,
    ClientSubscription
};