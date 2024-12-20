// import Event from "../../models/eventModel.js";
import EventSetup from "../../models/eventsetupModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const events = await EventSetup.findAll();
            responseHandler.success(res, "Events fetched successfully", events);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}