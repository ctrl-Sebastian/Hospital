import axios from 'axios';

const API = 'http://localhost:4000/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export const getBills = () => instance.get(`/bills`)
export const payBillRequest = (bill) => instance.put(`/bills/${bill._id}`, bill)
export const postTransactionsRequest = ({user, bill}) => instance.post(`/transactions`, {user, bill})