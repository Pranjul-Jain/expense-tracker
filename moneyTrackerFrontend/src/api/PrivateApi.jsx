import axios from "axios"
import { getToken,getTokenWithRefreshToken } from "../utils/auth/Auth"

export const PrivateApi = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL
})


PrivateApi.interceptors.request.use((config)=>{
    const headers = config.headers
    let token = getToken()

    headers.Authorization = {
        ...headers,
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }

    return config;

},
(err)=>{
    return Promise.reject(err)
})

PrivateApi.interceptors.response.use((response)=>{
    return response
},
async (err)=>{
    const originalConfig = err.config

    if(err.response){
        if(err.response.status === 401 && !originalConfig._retry){
            originalConfig._retry = true
            try{
                const token = await getTokenWithRefreshToken()
                if(token){
                    return PrivateApi(originalConfig)
                }
                return Promise.reject(err)
            }catch(err){
                return Promise.reject(err)
            }
        }
    }

    return Promise.reject(err)
})