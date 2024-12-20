import responseHandler from "../../utils/responseHandler.js";
import EventSetup from "../../models/eventsetupModel.js";

export default {
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            const event = await EventSetup.findByPk(id);   
            if (!event) {
                return responseHandler.error(res, "Event not found");
            }
            await event.destroy();
            responseHandler.success(res, "Event deleted successfully", event);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
        }   
}   