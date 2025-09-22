import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

export default function Login() {

    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let { setUserToken } = useContext(UserContext);
    let navigate =useNavigate();

let validationSchema = yup.object().shape({
    email: yup.string().required('email is Required').email('invalid email'),
    password: yup.string().required('password is Required').matches( /^[A-Z]\w{7,15}$/ ,'invalid password'),
})

    async function login(values) {

        try {
            setLoading(true);
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values);
            localStorage.setItem('token', data.token);
            setUserToken(data.token);
            navigate('/home')
        }
        catch (err){
            setApiError(err.response.data.message);
            setLoading(false);
        }

    }

    const formik = useFormik({
        initialValues: {
        email: '',
        password: '',
        },validationSchema
        ,onSubmit: login
    })

return <>
    <form onSubmit={formik.handleSubmit} className="md:w-1/2 w-full px-4 mx-auto">
        {apiError && (
            <div className="px-4 py-2 mb-6 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                {apiError}
            </div>
        )}

        {/* Email Field */}
        <div className="relative z-0 w-full mb-5 group">
            <input
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                placeholder=" "
                required
                aria-invalid={formik.errors.email && formik.touched.email ? 'true' : 'false'}
            />
            <label
                htmlFor="email"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Enter Your Email
            </label>
        </div>
        {formik.errors.email && formik.touched.email && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                {formik.errors.email}
            </div>
        )}

        {/* Password Field */}
        <div className="relative z-0 w-full mb-5 group">
            <input
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-main peer"
                placeholder=" "
                required
                aria-invalid={formik.errors.password && formik.touched.password ? 'true' : 'false'}
            />
            <label
                htmlFor="password"
                className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-main peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
                Enter Your Password
            </label>
        </div>
        {formik.errors.password && formik.touched.password && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:text-red-400" role="alert">
                {formik.errors.password}
            </div>
        )}

        {/* Submit & Forgot Password */}
        <div className="flex justify-between items-center mt-4">
            <button
                type="submit"
                disabled={!(formik.isValid && formik.dirty) || loading}
                className={`btn bg-main text-white px-6 py-2 rounded transition duration-200 ${
                    !(formik.isValid && formik.dirty) || loading
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-opacity-90'
                }`}
            >
                {loading ? <i className="fas fa-spinner fa-spin" /> : 'Login'}
            </button>

            {/* فقط اعرض الرابط إذا لم يكن loading */}
                {!loading && ( 
                    <Link to="/forgetpassword" className="text-sm text-main hover:underline">
                        Forgot Password?
                    </Link>
                )}
        </div>
    </form>
</>
}
