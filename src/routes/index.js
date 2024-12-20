import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import designationRoutes from "./designationAnddepartmentRoutes.js";
import announcementAndeventsetupRoutes from "./announcementAndeventsetupRoutes.js";

import clientRoutes from "./clientRoutes.js";
const router = express.Router();


router.use('/auth', authRoutes);
router.use('/client', clientRoutes);
router.use('/user', userRoutes);
router.use('/designation-department', designationRoutes);
router.use('/announcement-event-setup', announcementAndeventsetupRoutes);


export default router;
