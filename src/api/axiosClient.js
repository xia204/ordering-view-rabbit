import axios from 'axios'

// Generic axios client with Authorization header injected from localStorage
export const axiosClient = axios.create()

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Helper to create instance with a specific baseURL
export const createClient = (baseURL) => {
  const client = axios.create({ baseURL })

  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('accessToken')
      if (token) {
        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  return client
}

export default axiosClient
