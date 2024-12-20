import Department from "../../models/departmentModel.js";
import responseHandler from "../../utils/responseHandler.js";


export default {
    handler: async (req, res) => {
        const { id } = req.params;
        try {
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