import { Role } from "../../models/roleModel.js";
import { User } from "../../models/userModel.js";
import { Client } from "../../models/clientModel.js";
import responseHandler from "../../utils/responseHandler.js";

const checkUserRole = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            if (!req.user || !req.user.id) {
                return responseHandler.error(res, "User not authenticated");
            }

            const user = await User.findByPk(req.user.id) || await Client.findByPk(req.user.id);

            if (!user) {
                return responseHandler.error(res, "User not found");
            }
            const role = await Role.findByPk(user.role_id);
            if (!role) {
                return responseHandler.error(res, "Role not found");
            }

            if (!allowedRoles.includes(role.role_name)) {
                return responseHandler.error(res, "Unauthorized access");
            }

            next();
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    };
};

export default checkUserRole;