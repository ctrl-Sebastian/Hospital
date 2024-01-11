import { Router } from "express";
import { 
    getAllUsers,
    getUser,
    login, 
    register, 
    logout, 
    profile, 
    verifyToken, 
    deleteUser,
    updateUser
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
router.get('/users/:id', getUser)

router.delete('/users/:id', deleteUser)

router.put('/users/:id', updateUser)

export default router;