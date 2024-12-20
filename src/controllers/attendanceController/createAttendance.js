import Joi from "joi";
import Attendance from "../../models/attendanceModel.js";
import User from "../../models/userModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        body: Joi.object({
            employee_id: Joi.string().required(),
            date: Joi.date().required(),
            checkIn: Joi.string().required(),
            checkOut: Joi.string().optional(),
            status: Joi.string().valid('present', 'absent', 'half-day').required(),
            notes: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { employee_id, date, check_in, check_out, status, notes } = req.body;

            // Check if user exists
            const user = await User.findByPk(employee_id);
            if (!user) {
                return responseHandler.notFound(res, "User not found");
            }

            // Check if attendance already exists for this date
            const existingAttendance = await Attendance.findOne({
                where: { employee_id, date }
            });

            if (existingAttendance) {
                return responseHandler.error(res, "Attendance already marked for this date");
            }

            const attendance = await Attendance.create({
                employee_id,
                date,
                check_in,
                check_out,
                status,
                notes,
                created_by: req.user?.id
            });

            responseHandler.created(res, "Attendance marked successfully", attendance);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
