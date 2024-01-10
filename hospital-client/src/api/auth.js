import axios from 'axios';

const API = 'http://localhost:4000/api'

const instance = axios.create({
    baseURL: API,
    withCredentials: true
})

export const registerRequest = (user) => instance.post(`/register`, user,)

export const loginRequest = user => instance.post(`/login`, user,)

export const verifyTokenRequest = () => instance.get('/verify', {withCredentials: true})