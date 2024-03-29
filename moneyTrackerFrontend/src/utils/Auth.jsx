import auth from "../config/auth/auth.json"

export const setToken = (args) => {
    localStorage.setItem(args.name,args.value)
}

export const getToken = () => {
    return localStorage.getItem(auth.tokenname)
}

export const getRefreshToken = async () => {
    return JSON.parse(localStorage.getItem(auth.refreshTokenName))?.value
}