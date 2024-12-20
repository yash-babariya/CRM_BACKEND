import express from "express";
import { signup, login, getAllUsers, getUserById } from "../controllers/authControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

// Auth routes
router.post('/signup', signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);

// User routes (protected)
router.get('/users', authenticateUser, checkUserRole(['super-admin']), getAllUsers.handler);
router.get('/users/:id', authenticateUser, checkUserRole(['super-admin']), getUserById.handler);

export default router;
