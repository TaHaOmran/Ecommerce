import axios from "axios";
import { createContext, useEffect, useState } from "react";



export let UserContext = createContext();

export default function UserContextProvider({children}) {

    const [UserToken, setUserToken] = useState(null);
    const [email , setEmail] = useState('');

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setUserToken(localStorage.getItem('token'));
        }
    }, [])
    
    async function forgetPasswordApi(values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
    }

    async function verifyResetCodeApi(values) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
    }


    async function resetPasswordApi(values) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values);
    }

    return <UserContext.Provider value={ { UserToken, email , setUserToken , forgetPasswordApi , resetPasswordApi , verifyResetCodeApi , setEmail } }>
        {children}
    </UserContext.Provider>
}