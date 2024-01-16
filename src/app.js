import express from "express";
import morgan from "morgan";
import fs from 'fs'
import path from "path";
import cookieParser from "cookie-parser";
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import billsRoutes from './routes/bills.routes.js'
import transactionsRoutes from './routes/transaction.routes.js'
import appointmentsRoutes from './routes/appointments.routes.js'
import servicesRequestRoutes from './routes/serviceRequest.routes.js'

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))
app.use(morgan('dev'))
// log all requests to access.log
app.use(morgan('common', {
    stream: fs.createWriteStream('./access.log', {flags: 'a'})
}));
app.use(express.json())
app.use(cookieParser())


app.use('/api', authRoutes)
app.use('/api', billsRoutes)
app.use('/api', transactionsRoutes)
app.use('/api', appointmentsRoutes)
app.use('/api', servicesRequestRoutes)

export default app;