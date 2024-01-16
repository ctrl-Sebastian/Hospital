import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    service: {
        type: String,
        required: true,
    }, 
    date: {
        type: String,
        required: true,
    }
},  {
        timestamps: true
    }
)

export default mongoose.model('ServiceRequest', serviceSchema)