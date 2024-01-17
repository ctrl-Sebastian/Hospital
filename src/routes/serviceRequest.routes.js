import { Router } from "express";

import { 
    getServiceRequests,
    createServiceRequest,
    deleteServiceRequest,
} from "../controllers/serviceRequest.controller.js";


const router = Router()
router.get('/services', getServiceRequests)
router.post('/services', createServiceRequest)
router.delete('/services', deleteServiceRequest)

export default router