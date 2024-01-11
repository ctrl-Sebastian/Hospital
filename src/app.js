import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import billsRoutes from './routes/bills.routes.js'
import transactionsRoutes from './routes/transaction.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())


app.use('/api', authRoutes)
app.use('/api', billsRoutes)
app.use('/api', transactionsRoutes)

export default app;