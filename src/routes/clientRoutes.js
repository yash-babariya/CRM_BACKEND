import express from "express";
import { getAllClients, getClientById, updateClient, deleteClient, createClient } from "../controllers/clientControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();

router.post('/create', authenticateUser, checkUserRole(['super-admin']), createClient.validator, createClient.handler);
router.get('/get-all', authenticateUser, checkUserRole(['super-admin']), getAllClients.handler);
router.get('/:id', authenticateUser, checkUserRole(['super-admin']), getClientById.handler);
router.put('/:id', authenticateUser, checkUserRole(['super-admin']), updateClient.handler);
router.delete('/:id', authenticateUser, checkUserRole(['super-admin']), deleteClient.handler);


export default router;