import Appointment from '../models/appointment.model.js'

export const getAppointments = async (req, res) => {
    const appointments = await Appointment.find()
    res.json(appointments)
}


export const createAppointment = async (req, res) => {
    const {user, bill} = req.body

    const newAppointment = new Appointment({
        user,
        doctor,
        description,
        date,
    })
    const savedAppointment = await newAppointment.save()
    res.json(savedAppointment)
}

export const deleteAppointment = async (req, res) => {
    const appointment = await Appointment.findByIdAndDelete(req.params.id)
    if(!appointment) return res.status(404).json({ message: 'Appointment not found'})
    return res.sendStatus(204)
}