import Joi from "joi";
import User from "../../models/userModel.js";
import Role from "../../models/roleModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const users = await User.findAll({
                include: [{
                    model: Role,
                    attributes: ['role_name']
                }],
                attributes: { exclude: ['password'] },
                offset: (page - 1) * limit,
                limit: parseInt(limit)
            });

            responseHandler.success(res, "Users fetched successfully", users);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
