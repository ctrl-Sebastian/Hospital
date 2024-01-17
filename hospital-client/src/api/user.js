import axios from 'axios';

const API = 'http://localhost:4000/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export const getBills = () => instance.get(`/bills`)
export const payBillRequest = (bill) => instance.put(`/bills/${bill._id}`, bill)
export const postTransactionsRequest = (transaction) => instance.post(`/transactions`, transaction)


export const getAppointmentsRequest = () => instance.get(`/appointments`)
export const postAppointmentRequest = (appointment) => instance.post(`/appointments`, appointment)

export const getServicesRequest = () => instance.get(`/services`)
export const postServiceRequest = (serviceBeignRequested) => instance.post(`/services`, serviceBeignRequested)