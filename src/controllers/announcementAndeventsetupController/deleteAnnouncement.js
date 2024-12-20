import responseHandler from "../../utils/responseHandler.js";
import Announcement from "../../models/announcementModel.js";

export default {
    handler: async (req, res) => {
        const { id } = req.params;
        try {
            const announcement = await Announcement.findByPk(id);   
            if (!announcement) {
                return responseHandler.error(res, "Announcement not found");
            }
            await announcement.destroy();
            responseHandler.success(res, "Announcement deleted successfully", announcement);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }   
}   