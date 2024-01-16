import { Router } from "express";

import { 
    getServiceRequests,
    createServiceRequest,
    deleteServiceRequest,
} from "../controllers/serviceRequest.controller.js";


const router = Router()
router.get('/transactions', getServiceRequests)
router.post('/transactions', createServiceRequest)
router.delete('/transactions', deleteServiceRequest)

export default router