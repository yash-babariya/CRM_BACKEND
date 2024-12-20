import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            user_id: Joi.string().required(),
            start_date: Joi.date().required(),
            end_date: Joi.date().required(),
            leave_type: Joi.string().valid('sick', 'casual', 'annual', 'other').required(),
            reason: Joi.string().required(),
            status: Joi.string().valid('pending', 'approved', 'rejected').default('pending')
        })
    }),
    handler: async (req, res) => {
        try {
            const { user_id, start_date, end_date, leave_type, reason, status } = req.body;

            // Check if user exists
            const user = await User.findByPk(user_id);
            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            // Check for overlapping leaves
            const overlappingLeave = await Leave.findOne({
                where: {
                    user_id,
                    [Op.or]: [
                        {
                            start_date: {
                                [Op.between]: [start_date, end_date]
                            }
                        },
                        {
                            end_date: {
                                [Op.between]: [start_date, end_date]
                            }
                        }
                    ]
                }
            });

            if (overlappingLeave) {
                return responseHandler.error(res, "Leave already exists for these dates");
            }

            const leave = await Leave.create({
                user_id,
                start_date,
                end_date,
                leave_type,
                reason,
                status,
                created_by: req.user?.id
            });

            responseHandler.created(res, "Leave request created successfully", leave);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
