import axios from 'axios';

const API = 'http://localhost:4000/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export const getPatients = () => instance.get(`/users`)
export const getBills = () => instance.get(`/users`)

