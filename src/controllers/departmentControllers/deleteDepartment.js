import Joi from "joi";
import Department from "../../models/departmentModel.js";
import responseHandler from "../../utils/responseHandler.js";
import validator from "../../utils/validator.js";


export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required().messages({
                'string.base': 'Department ID must be a string',
                'string.empty': 'Department ID is required',
            })
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const department = await Department.findByPk(id);
            if (!department) {
                return responseHandler.error(res, "Department not found");
            }
            await department.destroy();
            responseHandler.success(res, "Department deleted successfully", department);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}   