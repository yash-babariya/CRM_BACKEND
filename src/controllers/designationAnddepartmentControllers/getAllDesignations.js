import { Designation } from "../../models/designationModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const designations = await Designation.findAll();
            responseHandler.success(res, "Designations fetched successfully", designations);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }

}