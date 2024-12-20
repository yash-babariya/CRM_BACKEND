import Announcement from "../../models/announcementModel.js";
import responseHandler from "../../utils/responseHandler.js";

export default {
    handler: async (req, res) => {
        try {
            const announcements = await Announcement.findAll();
            responseHandler.success(res, "Announcements fetched successfully", announcements);
        } catch (error) {
            responseHandler.error(res, error.message);
        }
    }
}
