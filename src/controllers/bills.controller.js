import Bill from "../models/bill.model.js";

export const getAllBills = async (req, res) => {
    const bills = await Bill.find()
    res.json(bills)
}

export const getBills = async (req, res) => {
    const bills = await Bill.find({
        user: req.user.id
    })
    res.json(bills)
}

export const getUserBills = async (req, res) => {
    const bills = await Bill.find({
        user: req.params.id
    })
    res.json(bills)
}


export const getBill = async (req, res) => {
    const bill = await Bill.findById(req.params.id).populate('user')
    if(!bill) return res.status(404).json({ message: 'Bill not found'})
    res.json(bill)
}

export const createBill = async (req, res) => {
    const {user, balance, description} = req.body

    const newBill = new Bill({
        user,
        balance,
        billStatus: "active",
        description
    })
    const savedBill = await newBill.save()
    console.log(savedBill)
    res.json(savedBill)
}

export const deleteBill = async (req, res) => {
    const bill = await Bill.findByIdAndDelete(req.params.id)
    if(!bill) return res.status(404).json({ message: 'Bill not found'})
    return res.sendStatus(204)
}

export const updateBill = async (req, res) => {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!bill) return res.status(404).json({ message: 'Bill not found'})
    res.json(bill)
}
