import responseHandler from "../../utils/responseHandler.js";
import { Designation } from "../../models/designationModel.js";

export default {
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            const designation = await Designation.findByPk(id);
            if (!designation) {
                return responseHandler.error(res, "Designation not found");
            }
            await designation.destroy();
            responseHandler.success(res, "Designation deleted successfully", designation);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }   
}   