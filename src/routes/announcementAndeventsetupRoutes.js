import { createAnnouncement, getAllAnnouncement, createEventsetUp, getAllEventsetUp,
    updateAnnouncement, updateEventsetUp, deleteAnnouncement, deleteEventsetUp
 } from "../controllers/announcementAndeventsetupController/index.js";
import express from "express";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";


const router = express.Router();


// Announcement Routes start ==============================================
router.post("/create-announcement", authenticateUser, checkUserRole(["client"]), createAnnouncement.validator, createAnnouncement.handler);
router.get("/get-all-announcements", authenticateUser, checkUserRole(["client"]), getAllAnnouncement.handler);
router.put("/update-announcement/:id", authenticateUser, checkUserRole(["client"]), updateAnnouncement.validator, updateAnnouncement.handler);
router.delete("/delete-announcement/:id", authenticateUser, checkUserRole(["client"]), deleteAnnouncement.handler);


// Announcement Routes end ================================================

// Event Routes start ====================================================      
router.post("/create-event", authenticateUser, checkUserRole(["client"]), createEventsetUp.validator, createEventsetUp.handler);
router.get("/get-all-events", authenticateUser, checkUserRole(["client"]), getAllEventsetUp.handler);
router.put("/update-event/:id", authenticateUser, checkUserRole(["client"]), updateEventsetUp.validator, updateEventsetUp.handler);
router.delete("/delete-event/:id", authenticateUser, checkUserRole(["client"]), deleteEventsetUp.handler);



// Event Routes end ======================================================
export default router;