import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";

import { 
    getTransactions,
    createTransaction,
    deleteTransaction,
} from "../controllers/transaction.controller.js";


const router = Router()
router.get('/transactions', getTransactions)
router.post('/transactions', createTransaction)
router.delete('/transactions', deleteTransaction)

export default router