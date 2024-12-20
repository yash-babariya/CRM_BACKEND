import { User } from "../../models/userModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    validator: async (req, res, next) => {
        const { id } = req.params;
        if (!id) {
            return responseHandler.error(res, "User ID is required");
        }
        next();
    },
    handler: async (req, res) => {
        try {
            const { id } = req.params;
            const user = await User.findByPk(id);

            if (!user) {
                return responseHandler.error(res, "User not found");
            }

            responseHandler.success(res, "User fetched successfully", user);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}