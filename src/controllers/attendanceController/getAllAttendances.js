import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        query: Joi.object({
            page: Joi.number().optional(),
            limit: Joi.number().optional(),
            start_date: Joi.date().optional(),
            end_date: Joi.date().optional(),
            employee_id: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { page = 1, limit = 10, start_date, end_date, employee_id } = req.query;

            const whereClause = {};
            if (start_date && end_date) {
                whereClause.date = {
                    [Op.between]: [start_date, end_date]
                };
            }
            if (employee_id) {
                whereClause.employee_id = employee_id;
            }

            const attendances = await Attendance.findAll({
                where: whereClause,
                include: [{
                    model: User,
                    attributes: ['username', 'email']
                }],
                offset: (page - 1) * limit,
                limit: parseInt(limit)
            });

            responseHandler.success(res, "Attendances fetched successfully", attendances);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
