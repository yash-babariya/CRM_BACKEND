import Joi from "joi";
import Leave from "../../models/leaveModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            status: Joi.string().valid('pending', 'approved', 'rejected').required(),
            admin_remarks: Joi.string().optional()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, admin_remarks } = req.body;

            const leave = await Leave.findByPk(id);
            if (!leave) {
                return responseHandler.notFound(res, "Leave record not found");
            }

            await leave.update({
                status,
                admin_remarks,
                updated_by: req.user?.id
            });

            responseHandler.success(res, "Leave status updated successfully", leave);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};
