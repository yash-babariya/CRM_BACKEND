import express from "express";
import {
    getAllDesignations, createDepartment, createDesignation,
    updateDepartment, updateDesignation, deleteDesignation, deleteDepartment,
    getAllDepartments
} from "../controllers/designationAnddepartmentControllers/index.js";
import { authenticateUser, checkUserRole } from "../middlewares/index.js";

const router = express.Router();


//Designation Route start================================
router.post("/create-designation", createDesignation.validator, createDesignation.handler);
router.get("/get-all-designations", authenticateUser, checkUserRole(['client']), getAllDesignations.handler);
router.put("/update-designation/:id", authenticateUser, checkUserRole(['client']), updateDesignation.validator, updateDesignation.handler);
router.delete("/delete-designation/:id", authenticateUser, checkUserRole(['client']), deleteDesignation.handler);


//Designation Route end ==================================


//Department Route start===================================
router.post("/create-department", authenticateUser, checkUserRole(['client']), createDepartment.validator, createDepartment.handler);
router.get("/get-all-departments", authenticateUser, checkUserRole(['client']), getAllDepartments.handler);
router.put("/update-department/:id", authenticateUser, checkUserRole(['client']), updateDepartment.validator, updateDepartment.handler);
router.delete("/delete-department/:id", authenticateUser, checkUserRole(['client']), deleteDepartment.handler);


//Department Route end ====================================

export default router;