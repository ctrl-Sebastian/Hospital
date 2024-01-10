import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    billStatus: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},  {
        timestamps: true
    }
)

export default mongoose.model('Bill', billSchema)