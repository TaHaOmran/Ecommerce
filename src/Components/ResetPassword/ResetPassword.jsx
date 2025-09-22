import React, { useContext, useState } from 'react'
import styles from './ResetPassword.module.css'
import * as Yup from 'yup'
import toast from 'react-hot-toast';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';

export default function ResetPassword() {

    let { resetPasswordApi, setEmail , email } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isResetCode, setIsResetCode] = useState(false);
    let navigate = useNavigate();

    async function handleResetPassword(values) {
        setIsLoading(true);
        let res = await resetPasswordApi(values);
        if (res?.data?.token) {
            setIsResetCode(true);
            toast.success('Password reset successfully');
            navigate('/login')
        }
        else {
            setIsResetCode(false);
            toast.error(res?.response?.data?.message ? res?.response?.data?.message : "Failed Operation");
        }
        setIsLoading(false);
    }
    
    let validationSchema = Yup.object({
        email: Yup.string().required("email is required").email("email is invalid"),
        newPassword: Yup.string().required("New Password is required").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, 'New Password must have spiacl characters, capital letters, small letters, numbers, and min 8 characters'),
    });

    let formik1 = useFormik({
        initialValues: {
            email: email!=null? email : '',
        },
        onSubmit: handleResetPassword,
        validationSchema,
    });


    return <>
        <div className="w-full max-w-lg mx-auto py-8 px-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-main mb-6">
                Reset Your Password
            </h3>

            <form onSubmit={formik1.handleSubmit}>
                {/* Email Field */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formik1.values.email}
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                    >
                        Email Address
                    </label>
                </div>
                    {formik1.errors.email && formik1.touched.email && (
                    <div className="mb-4 text-sm text-red-600">{formik1.errors.email}</div>
                    )}

                {/* New Password Field */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formik1.values.newPassword}
                        onChange={formik1.handleChange}
                        onBlur={formik1.handleBlur}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="newPassword"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                    >
                        New Password
                    </label>
                </div>
                {formik1.errors.newPassword && formik1.touched.newPassword && (
                <div className="mb-4 text-sm text-red-600">{formik1.errors.newPassword}</div>
                )}

                {/* Submit Button */}
                {isLoading ? (
                    <button
                        type="button"
                        className="w-full flex justify-center items-center bg-main text-white py-2 rounded hover:bg-opacity-90 transition"
                    >
                        <i className="fas fa-spinner fa-spin text-lg"></i>
                    </button>
                    ) : (
                    <button
                        type="submit"
                        disabled={!(formik1.isValid && formik1.dirty)}
                        className={`w-full py-2 text-white rounded transition ${
                        !(formik1.isValid && formik1.dirty)
                            ? 'bg-main opacity-50 cursor-not-allowed'
                            : 'bg-main hover:bg-opacity-90'
                        }`}
                    >
                        Confirm
                    </button>
                )}
            </form>
        </div>
    </>
}
