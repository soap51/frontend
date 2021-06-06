import axios from "axios"

export const STORAGE_KEY = {
    TOKEN: "TOKEN"
}

interface ILoginRequest {
    user: {
        email: string;
        password: string;
    }
}

interface IGetProfileRequest {
    id: string;
}

interface IUpdateProfileRequest {
    name: string;
    id: string;
}

interface IRegisterProfileRequest {
    email: string;
    password: string;
    name: string;
}
export const login = async ({user}: ILoginRequest) => {
    try{
        const fetchUrl = process.env.REACT_APP_API_URL+'/user/login'
        const res = await axios.post(fetchUrl,{...user})
        const {data} = res

        localStorage.setItem(STORAGE_KEY.TOKEN, data.token)                        
        return data
    }catch(err){

        throw err;
    }
}

export const getProfile = async ({id}:IGetProfileRequest) => {
    try{
        const fetchUrl = process.env.REACT_APP_API_URL+`/user/${id}`;
        const res = await axios.get(fetchUrl)
        const data = res.data
        return data
    }catch(err){
        throw err;
    }
} 

export const updateProfile = async ({name, id}: IUpdateProfileRequest) => {
    try{
        const fetchUrl = process.env.REACT_APP_API_URL+`/user/${id}`;
        const res = await axios.put(fetchUrl, {name})
        const data = res.data
        return data
    }catch(err){
        throw err;
    }
}

export const register = async ({email, password, name} :IRegisterProfileRequest) => {
    try{
        const res = await axios.post(process.env.REACT_APP_API_URL + '/user/register', {
            email,
            password,
            name
        })
        const {data} = res
        localStorage.setItem(STORAGE_KEY.TOKEN, data.token)                        
        return data;
    }catch(err){
        throw err;
    }
}