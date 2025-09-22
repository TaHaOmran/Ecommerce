import React, { useContext, useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { useEffect } from 'react'


export default function Register() {

    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let { setUserToken } = useContext(UserContext);
    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        }
    }, []);

let validationSchema = yup.object().shape({
    name: yup.string().required('name is Required').min(3, 'minimum characters is 3').max(15, 'maximum characters is 3'),
    email: yup.string().required('email is Required').email('invalid email'),
    password: yup.string().required('password is Required').matches( /^[A-Z]\w{7,15}$/ ,'invalid password'),
    rePassword: yup.string().required('rePassword is Required').oneOf([yup.ref('password')] , 'password and rePassword dont match'),
    phone: yup.string().required('phone is Required').matches(/^01[0125][0-9]{8}$/ , 'You must have an Egyptian phone'),
})

    async function register(values) {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values);
            localStorage.setItem('token', data.token);
            setUserToken(data.token);
            navigate('home')
        }
        catch (err){
            console.log(err.response.data.message);
            setApiError(err.response.data.message);
            setLoading(false);
        }

    }

    const formik = useFormik({
        initialValues: {
        name: '',
        email: '',
        password: '',
        rePassword: '',
        phone: ''
        },validationSchema
        ,onSubmit: register
    })

return <>
    <form onSubmit={formik.handleSubmit} className="md:w-1/2 mx-auto space-y-6">
        {apiError && (
            <div className="px-4 py-2 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                {apiError}
            </div>
        )}

        {/* Input Field Reusable Block */}
        {[
            { label: 'Enter Your Name', name: 'name', type: 'text' },
            { label: 'Enter Your Email', name: 'email', type: 'email' },
            { label: 'Enter Your Password', name: 'password', type: 'password' },
            { label: 'Enter Your rePassword', name: 'rePassword', type: 'password' },
            { label: 'Enter Your Phone', name: 'phone', type: 'tel' },
        ].map(({ label, name, type }) => (
        <div key={name} className="relative z-0 w-full group">
            <input
                value={formik.values[name]}
                type={type}
                name={name}
                id={name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                placeholder=" "
                required
            />
            <label
                htmlFor={name}
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                {label}
            </label>
            {formik.errors[name] && formik.touched[name] && (
                <div className="mt-2 text-sm text-red-800 bg-red-50 rounded-lg px-3 py-1 dark:text-red-400">
                    {formik.errors[name]}
                </div>
            )}
        </div>
    ))}

    {/* Submit Button */}
        <div className="flex justify-start">
            <button
                type="submit"
                disabled={!formik.isValid || !formik.dirty || loading}
                className={`text-white bg-main px-6 py-2.5 rounded-lg text-sm font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-main dark:bg-main dark:hover:bg-opacity-90 ${
                (!formik.isValid || !formik.dirty || loading)
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-opacity-90'
                }`}
            >
                {loading ? <i className="fas fa-spinner fa-spin" /> : 'Register'}
            </button>
        </div>
    </form>
</>
}
