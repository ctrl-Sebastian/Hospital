import { Router } from "express";
import { 
    getAllUsers,
    login, 
    register, 
    logout, 
    profile, 
    verifyToken 
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";

const router = Router();

router.post('/verify', verifyToken)
router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)

router.get('/users', getAllUsers)
router.get('/profile', authRequired, profile)

export default router;