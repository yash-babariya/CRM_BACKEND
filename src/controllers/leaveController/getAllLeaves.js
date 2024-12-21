import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
            status: Joi.string().valid('pending', 'approved', 'rejected').optional(),
            employee_id: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page = 1, limit = 10, status, employee_id } = req.query;

            const whereClause = {};
            if (status) whereClause.status = status;
            if (employee_id) whereClause.employee_id = employee_id;

            const leaves = await Leave.findAndCountAll({
                where: whereClause,
                include: [{
                    model: User,
                    as: 'employee',
                    attributes: ['username', 'email']
                }],
                offset: (page - 1) * limit,
                limit: parseInt(limit),
                order: [['createdAt', 'DESC']]
            });

            responseHandler.success(res, "Leaves fetched successfully", {
                leaves: leaves.rows,
                total: leaves.count,
                page: parseInt(page),
                totalPages: Math.ceil(leaves.count / limit)
            });
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
