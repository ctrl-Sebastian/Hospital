import ServiceRequest from '../models/serviceRequest.model.js'

export const getServiceRequests = async (req, res) => {
    const serviceRequests = await ServiceRequest.find()
    res.json(serviceRequests)
}


export const createServiceRequest = async (req, res) => {
    const {user, bill} = req.body

    const newServiceRequest = new ServiceRequest({
        user,
        service,
        date,
    })
    const savedServiceRequest = await newServiceRequest.save()
    res.json(savedServiceRequest)
}

export const deleteServiceRequest = async (req, res) => {
    const serviceRequest = await ServiceRequest.findByIdAndDelete(req.params.id)
    if(!serviceRequest) return res.status(404).json({ message: 'ServiceRequest not found'})
    return res.sendStatus(204)
}