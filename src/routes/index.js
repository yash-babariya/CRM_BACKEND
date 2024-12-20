import express from "express";
import authRoutes from "./authRoutes.js";
import userRoutes from "./userRoutes.js";
import roleRoutes from "./roleRoutes.js";
import clientRoutes from "./clientRoutes.js";
import employeeRoutes from "./employeeRoutes.js";
import departmentRoutes from "./departmentRoutes.js";
import designationRoutes from "./designationRoutes.js";
import announcementAndeventsetupRoutes from "./announcementAndeventsetupRoutes.js";
const router = express.Router();


router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/roles', roleRoutes);
router.use('/clients', clientRoutes);
router.use('/employees', employeeRoutes);
router.use('/departments', departmentRoutes);
router.use('/designations', designationRoutes);
router.use('/announcement-event-setup', announcementAndeventsetupRoutes);


export default router;
