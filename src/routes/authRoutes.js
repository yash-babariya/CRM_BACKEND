import express from "express";
import { signup, login } from "../controllers/authControllers/index.js";

const router = express.Router();


router.post('/signup', signup.validator, signup.handler);
router.post('/login', login.validator, login.handler);


export default router;
