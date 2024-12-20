import express from "express";
import {
    getAllDesignations, createDesignation,
    updateDesignation, deleteDesignation,
} from "../controllers/designationControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


router.post("/create-designation", createDesignation.validator, createDesignation.handler);
router.get("/get-all-designations", authenticateUser, checkUserRole(['client']), getAllDesignations.handler);
router.put("/update-designation/:id", authenticateUser, checkUserRole(['client']), updateDesignation.validator, updateDesignation.handler);
router.delete("/delete-designation/:id", authenticateUser, checkUserRole(['client']), deleteDesignation.handler);


export default router;