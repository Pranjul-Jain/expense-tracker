import auth from "../config/auth/auth.json"
import { PrivateApi } from "../api/PrivateApi"


export const setToken = (args) => {
    localStorage.setItem(args.name,args.value)
}

export const getToken = () => {
    return localStorage.getItem(auth.tokenname)
}

export const getTokenWithRefreshToken = async () => {
    const refreshToken = localStorage.getItem(auth.refreshTokenName)

    if(!refreshToken){
        return null
    }else{

        try{
            const response = await PrivateApi.post("/auth/refresh", {
                refreshToken
            })

            if(response){
                const data = response.data;

                localStorage.setItem(auth.tokenname, data.accessToken)
                localStorage.setItem(auth.refreshTokenName,data.refreshToken)

                return data.accessToken
            }else{
                return null
            }
        }catch(err){
            return null
        }

    }
}