import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    bill: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
        required: true,
    }
},  {
        timestamps: true
    }
)

export default mongoose.model('Transaction', transactionSchema)