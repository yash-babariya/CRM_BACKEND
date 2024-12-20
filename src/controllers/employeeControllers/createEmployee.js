import Joi from "joi";
import { Employee } from "../../models/index.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import bcrypt from "bcrypt";

export default {
    validator: validator({
        body: Joi.object({
            firstName: Joi.string().required().messages({
                'string.base': 'First name must be a string',
                'string.empty': 'First name is required'
            }),
            lastName: Joi.string().required().messages({
                'string.base': 'Last name must be a string',
                'string.empty': 'Last name is required'
            }),
            username: Joi.string().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required'
            }),
            password: Joi.string().required().messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invalid email format'
            }),
            phone: Joi.string().required().messages({
                'string.base': 'Phone must be a string',
                'string.empty': 'Phone is required'
            }),
            address: Joi.string().required().messages({
                'string.base': 'Address must be a string',
                'string.empty': 'Address is required'
            }),
            joiningDate: Joi.date().required().messages({
                'date.base': 'Joining date must be a valid date',
                'date.empty': 'Joining date is required'
            }),
            leaveDate: Joi.date().allow(null),
            department: Joi.string().required().messages({
                'string.base': 'Department must be a string',
                'string.empty': 'Department is required'
            }),
            designation: Joi.string().required().messages({
                'string.base': 'Designation must be a string',
                'string.empty': 'Designation is required'
            }),
            salary: Joi.number().required().messages({
                'number.base': 'Salary must be a number',
                'number.empty': 'Salary is required'
            }),
            accountholder: Joi.string().required().messages({
                'string.base': 'Account holder must be a string',
                'string.empty': 'Account holder is required'
            }),
            accountnumber: Joi.string().required().messages({
                'string.base': 'Account number must be a string',
                'string.empty': 'Account number is required'
            }),
            bankname: Joi.string().required().messages({
                'string.base': 'Bank name must be a string',
                'string.empty': 'Bank name is required'
            }),
            ifsc: Joi.string().required().messages({
                'string.base': 'IFSC must be a string',
                'string.empty': 'IFSC is required'
            }),
            banklocation: Joi.string().required().messages({
                'string.base': 'Bank location must be a string',
                'string.empty': 'Bank location is required'
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const {
                firstName, lastName, username, password, email, phone,
                address, joiningDate, leaveDate, department, designation,
                salary, accountholder, accountnumber, bankname, ifsc,
                banklocation
            } = req.body;

            // Check if email already exists
            const existingEmail = await Employee.findOne({ where: { email } });
            if (existingEmail) {
                return responseHandler.conflict(res, "Email already exists");
            }

            // Check if phone number already exists
            const existingPhone = await Employee.findOne({ where: { phone } });
            if (existingPhone) {
                return responseHandler.conflict(res, "Phone number already exists");
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create employee
            const employee = await Employee.create({
                firstName,
                lastName,
                username,
                password: hashedPassword,
                email,
                phone,
                address,
                joiningDate,
                leaveDate,
                department,
                designation,
                salary,
                accountholder,
                accountnumber,
                bankname,
                ifsc,
                banklocation
            });

            // Handle file uploads if included in the request
            if (req.files) {
                const updateData = {};

                if (req.files.cv) {
                    updateData.cv_path = req.files.cv[0].path;
                }

                if (req.files.photo) {
                    updateData.photo_path = req.files.photo[0].path;
                }

                if (Object.keys(updateData).length > 0) {
                    await employee.update(updateData);
                }
            }

            responseHandler.created(res, "Employee created successfully", employee);
        } catch (error) {
            console.error('Error creating employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};