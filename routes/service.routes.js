import { Router } from "express";
import {authorizeRole, verifytoken } from "../middlewares/auth.middlewares.js";
import { createService, updateService, getAllServices, getServiceById, deleteService } from "../controllers/service.controller.js";


const router = Router();

//anyone logged in can access
router.get(
    '/all-services',
    verifytoken,
    getAllServices
)

router.get(
    '/service',
    verifytoken,
    getServiceById
)


//only freelancer can creates services
router.post(
    '/create-service', 
    verifytoken, 
    authorizeRole("FREELANCER"), 
    createService
);

router.put(
    '/update-service',
    verifytoken,
    authorizeRole("FREELANCER"),
    updateService
)

router.delete(
    '/delete-service',
    verifytoken,
    authorizeRole("FREELANCER"),
    deleteService
)

export default router;