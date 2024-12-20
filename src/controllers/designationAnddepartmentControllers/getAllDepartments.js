import Department from "../../models/departmentModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const departments = await Department.findAll();
            responseHandler.success(res, "Departments fetched successfully", departments);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }

}

