import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import designationRoutes from "./designationAnddepartmentRoutes.js";
import announcementAndeventsetupRoutes from "./announcementAndeventsetupRoutes.js";

import clientRoutes from "./clientRoutes.js";
const router = express.Router();


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/clients', clientRoutes);
router.use('/employees', employeeRoutes);
router.use('/designation-department', designationRoutes);
router.use('/announcement-event-setup', announcementAndeventsetupRoutes);


export default router;
