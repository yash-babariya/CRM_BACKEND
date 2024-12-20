import { User } from "../../models/userModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const users = await User.findAll();
            responseHandler.success(res, "Users fetched successfully", users);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}