import React, { useState, useContext } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'

export default function ForgetPassword() {

    let { forgetPasswordApi, verifyResetCodeApi, setEmail } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [isResetCode, setIsResetCode] = useState(false);
    let navigate = useNavigate();

    // 📌 إرسال الإيميل
    async function handleForgetPassword(values) {
        setIsLoading(true);
        try {
            let res = await forgetPasswordApi({ email: values.email }); // تأكد من شكل الـ body
            if (res?.data?.statusMsg === 'success') {
                setIsResetCode(true);
                setEmail(values.email);
                toast.success(res?.data?.message);
            } else {
                setIsResetCode(false);
                toast.error(res?.data?.message || "Failed Operation");
            }
        } catch (err) {
            console.error("Forget Password Error:", err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Server Error");
        }
        setIsLoading(false);
    }

    // 📌 التحقق من كود الريسيت
    async function handleResetCode(values) {
        setIsLoading(true);
        console.log('Data being sent:', values);

        try {
            // لازم يتبعت كـ string
            const res = await verifyResetCodeApi({ resetCode: String(values.resetCode) });
            console.log('Response:', res.data);

            if (res?.data?.status === 'Success') {
                toast.success('Correct Code');
                navigate('/resetpassword');
            } else {
                toast.error(res?.data?.message || "Failed Operation");
            }
        } catch (err) {
            console.error('Server Error:', err.response?.data || err.message);
            toast.error(err.response?.data?.message || "Server Error");
        } finally {
            setIsLoading(false);
        }
    }

    // ✅ validation
    let validationMail = Yup.object({
        email: Yup.string().required("email is required").email("email is invalid"),
    });

    let validationCode = Yup.object({
        resetCode: Yup.string().required("resetCode is required"),
    });

    let formik1 = useFormik({
        initialValues: { email: '' },
        onSubmit: handleForgetPassword,
        validationSchema: validationMail,
    });

    let formik2 = useFormik({
        initialValues: { resetCode: '' },
        onSubmit: handleResetCode,
        validationSchema: validationCode,
    });

    return (
        <div className="max-w-lg mx-auto py-8">
            <h3 className="text-xl font-semibold mb-6 text-main">
                {isResetCode ? 'Reset Code' : 'Forget Password'}
            </h3>

            {isResetCode ? (
                // 📌 reset code form
                <form onSubmit={formik2.handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="text"
                            id="resetCode"
                            name="resetCode"
                            value={formik2.values.resetCode}
                            onChange={formik2.handleChange}
                            onBlur={formik2.handleBlur}
                            className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 appearance-none focus:border-main focus:outline-none focus:ring-0"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="resetCode"
                            className="absolute top-3 z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                        >
                            Enter Reset Code
                        </label>
                    </div>
                    {formik2.errors.resetCode && formik2.touched.resetCode && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            {formik2.errors.resetCode}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!formik2.isValid || !formik2.dirty || isLoading}
                        className={`w-full rounded bg-main px-5 py-2.5 text-white transition ${
                            !formik2.isValid || !formik2.dirty || isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-opacity-90'
                        }`}
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin" /> : 'Submit Code'}
                    </button>
                </form>
            ) : (
                // 📌 email form
                <form onSubmit={formik1.handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formik1.values.email}
                            onChange={formik1.handleChange}
                            onBlur={formik1.handleBlur}
                            className="peer block w-full border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 appearance-none focus:border-main focus:outline-none focus:ring-0"
                            placeholder=" "
                            required
                        />
                        <label
                            htmlFor="email"
                            className="absolute top-3 z-10 origin-[0] scale-75 transform text-sm text-gray-500 duration-300 -translate-y-6 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                        >
                            Enter Your Email
                        </label>
                    </div>
                    {formik1.errors.email && formik1.touched.email && (
                        <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
                            {formik1.errors.email}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!formik1.isValid || !formik1.dirty || isLoading}
                        className={`w-full rounded bg-main px-5 py-2.5 text-white transition ${
                            !formik1.isValid || !formik1.dirty || isLoading
                                ? 'opacity-50 cursor-not-allowed'
                                : 'hover:bg-opacity-90'
                        }`}
                    >
                        {isLoading ? <i className="fas fa-spinner fa-spin" /> : 'Send Email'}
                    </button>
                </form>
            )}
        </div>
    )
}
