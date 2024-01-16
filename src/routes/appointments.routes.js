import { Router } from "express";

import { 
    getAppointments,
    createAppointment,
    deleteAppointment,
} from "../controllers/appointments.controller.js";


const router = Router()
router.get('/appointments', getAppointments)
router.post('/appointments', createAppointment)
router.delete('/appointments', deleteAppointment)

export default router