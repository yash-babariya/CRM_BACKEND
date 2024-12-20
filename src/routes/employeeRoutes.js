import express from "express";
import { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employeeControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get('/', authenticateUser, checkUserRole(['client']), getAllEmployees.validator, getAllEmployees.handler);
router.post('/', authenticateUser, checkUserRole(['client']), upload.single('image'), createEmployee.validator, createEmployee.handler);
router.get('/:id', authenticateUser, checkUserRole(['client']), getEmployeeById.validator, getEmployeeById.handler);
router.put('/:id', authenticateUser, checkUserRole(['client']), upload.single('image'), updateEmployee.validator, updateEmployee.handler);
router.delete('/:id', authenticateUser, checkUserRole(['client']), deleteEmployee.validator, deleteEmployee.handler);


export default router;