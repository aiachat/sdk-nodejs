import axios from 'axios'

export const API_URL = 'https://api.aiachat.com.br/api/v1'

export const api = axios.create({
  baseURL: API_URL
})
