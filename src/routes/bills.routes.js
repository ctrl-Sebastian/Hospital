import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import { 
    getBills, 
    getAllBills, 
    getBill, 
    createBill, 
    updateBill, 
    deleteBill 
} from "../controllers/bills.controller.js";

import { validateSchema } from "../middlewares/validator.middleware.js";
import { createBillSchema } from "../schemas/bill.schema.js";


const router = Router()

router.get('/all-bills', authRequired, getAllBills)

router.get('/bills', authRequired, getBills)

router.get('/bills/:id', authRequired, getBill)

router.post('/bills',authRequired, validateSchema(createBillSchema), createBill)

router.delete('/bills/:id', authRequired, deleteBill)

router.put('/bills/:id', authRequired, updateBill)

export default router