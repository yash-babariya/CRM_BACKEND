import express from "express";
import { getAllEmployees, createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from "../controllers/employeeControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";
import upload from "../middlewares/upload.js";

const router = express.Router();

router.get('/', authenticateUser, getAllEmployees.handler);
router.post('/', authenticateUser, checkUserRole(['admin']), createEmployee.handler);
router.get('/:id', authenticateUser, getEmployeeById.handler);
router.put('/:id', authenticateUser, checkUserRole(['admin']), updateEmployee.handler);
router.delete('/:id', authenticateUser, checkUserRole(['admin']), deleteEmployee.handler);


export default router;