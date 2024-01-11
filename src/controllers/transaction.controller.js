import Transaction from '../models/transaction.model.js'

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find()
    res.json(transactions)
}


export const createTransaction = async (req, res) => {
    const {user, bill} = req.body

    const newTransaction = new Transaction({
        user,
        bill,
    })
    const savedTransaction = await newTransaction.save()
    res.json(savedTransaction)
}

export const deleteTransaction = async (req, res) => {
    const transaction = await Transaction.findByIdAndDelete(req.params.id)
    if(!transaction) return res.status(404).json({ message: 'Transaction not found'})
    return res.sendStatus(204)
}