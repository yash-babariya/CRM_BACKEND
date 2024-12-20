import { Client } from "../../models/clientModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const clients = await Client.findAll();
            responseHandler.success(res, "Clients fetched successfully", clients);
        } catch (error) {
            responseHandler.error(res, error.errors[0].message);
        }
    }
}