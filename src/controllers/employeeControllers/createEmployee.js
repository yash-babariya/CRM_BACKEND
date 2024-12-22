import Joi from "joi";
import Employee from "../../models/employeeModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";
import bcrypt from "bcrypt";

export default {
    validator: validator({
        body: Joi.object({
            username: Joi.string().required().messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required'
            }),
            email: Joi.string().email().required().messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Invalid email format'
            }),
            password: Joi.string()
                .required()
                .min(8)
                .pattern(new RegExp('^[a-zA-Z0-9!@#$%^&*]{8,30}$'))
                .messages({
                    'string.base': 'Password must be a string',
                    'string.empty': 'Password is required',
                    'string.min': 'Password must be at least 8 characters',
                    'string.pattern.base': 'Password must contain only letters, numbers and special characters'
                })
        })
    }),
    handler: async (req, res) => {
        try {
            const { username, email, password } = req.body;
            // Check if email already exists
            const existingEmail = await Employee.findOne({ where: { email } });
            if (existingEmail) {
                return responseHandler.conflict(res, "Email already exists");
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create employee with basic details
            const employee = await Employee.create({
                username,
                email,
                password: hashedPassword,
                role: 'employee'  // Default role
            });

            responseHandler.created(res, "Employee created successfully", employee);

        } catch (error) {
            console.error('Error creating employee:', error);
            responseHandler.error(res, error.message);
        }
    }
};