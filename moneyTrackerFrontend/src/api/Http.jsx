import axios from "axios"
import { getToken,getRefreshToken } from "../utils/Auth"

export const PrivateApi = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL
})

export const PublicApi = axios.create({
    baseURL : import.meta.env.VITE_SERVER_URL
})


PrivateApi.interceptors.request.use((config)=>{
    const headers = config.headers
    let token = getToken()

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    headers["Content-Type"] = "application/json";

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
    if(err.response && err.response.status === 401 && !originalConfig._retry){
        originalConfig._retry = true
        try{
            const token = await getRefreshToken()
            if(token){
                return PrivateApi(originalConfig)
            }
            return Promise.reject(err)
        }catch(err){
            return Promise.reject(err)
        }
    }

    return Promise.reject(err)
})


PublicApi.interceptors.request.use((config)=>{
    return config
},
(err)=>{
    return Promise.reject(err)
})

PublicApi.interceptors.response.use((response)=>{
    return response
},(err)=>{
    return Promise.reject(err)
})