import axios from 'axios'

export const makeRequest = axios.create({
    baseURL: 'http://localhost:8800/api/',
    withCredentials: true,
})
export const getCurrentUser = axios.create({
    baseURL: 'http://localhost:8800/api/users/getCurrentUser',
    withCredentials: true,
})
