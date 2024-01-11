import axios from 'axios';

const API = 'http://localhost:4000/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export const getPatients = () => instance.get(`/users`)
export const getPatientById = (id) => instance.get(`/users/${id}`)
export const getPatientBills = (id) => instance.get(`/usersBills/${id}`)
export const updatePatientRequest = (patient) => instance.put(`/users/${patient._id}`, patient)
export const deletePatient = (id) => instance.delete(`/users/${id}`)


export const getBillByIdRequest = (id) => instance.get(`/bills/${id}`)
export const postBill = (bill) => instance.post(`/bills`, bill)
export const updateBillRequest = (bill) => instance.put(`/bills/${bill._id}`, bill)
export const deleteBillRequest = (id) => instance.delete(`/bills/${id}`)

export const getTransactionsRequest = () => instance.get(`/transactions`)