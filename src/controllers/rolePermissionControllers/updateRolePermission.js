import Joi from "joi";
import RolePermission from "../../models/rolePermissionModel.js";
import validator from "../../utils/validator.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: validator({
        params: Joi.object({
            id: Joi.string().required()
        }),
        body: Joi.object({
            status: Joi.string().valid('active', 'inactive').required()
        })
    }),
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const rolePermission = await RolePermission.findByPk(id);
            if (!rolePermission) {
                return responseHandler.notFound(res, "Role permission not found");
            }

            await rolePermission.update({
                status,
                updated_by: req.user?.id
            });

            responseHandler.success(res, "Role permission updated successfully", rolePermission);
        } catch (error) {
            console.log(error);
            responseHandler.error(res, error.message);
        }
    }
};