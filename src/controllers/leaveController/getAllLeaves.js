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
            user_id: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page = 1, limit = 10, status, user_id } = req.query;

            const whereClause = {};
            if (status) whereClause.status = status;
            if (user_id) whereClause.user_id = user_id;

            const leaves = await Leave.findAll({
                where: whereClause,
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }],
                offset: (page - 1) * limit,
                limit: parseInt(limit)
            });

            responseHandler.success(res, "Leaves fetched successfully", leaves);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
