import express from "express";
import { getAllUsers, getUserById, updateUser, deleteUser } from "../controllers/userControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getUserById.validator, getUserById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateUser.validator, updateUser.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteUser.validator, deleteUser.handler);
router.get('/get-all', authenticateUser, checkUserRole(['super-admin']), getAllUsers.handler);

export default router;