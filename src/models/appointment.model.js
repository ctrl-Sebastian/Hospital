import mongoose from "mongoose";

const apointmentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctor: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String, 
        required: true,
    }
},  {
        timestamps: true
    }
)

export default mongoose.model('Apointment', apointmentSchema)