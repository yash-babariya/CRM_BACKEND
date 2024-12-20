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
            const users = await User.findAll({
                include: [{
                    model: Role,
                    attributes: ['role_name']
                }],
                attributes: { exclude: ['password'] } // Exclude password from the response
            });

            responseHandler.success(res, "Users fetched successfully", users);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
