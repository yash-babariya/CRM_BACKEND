import { Employee } from "../../models/index.js";

export const getAllEmployees = {
    handler: async (req, res) => {
        try {
            const employees = await Employee.findAll();
            res.status(200).json({
                message: 'Employees retrieved successfully',
                data: employees
            });
        } catch (error) {
            console.error('Error fetching employees:', error);
            res.status(500).json({
                message: 'Error fetching employees',
                error: error.message
            });
        }
    }
};
