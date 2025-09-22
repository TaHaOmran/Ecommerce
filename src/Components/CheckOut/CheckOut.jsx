import React, { useContext, useState } from 'react'
import style from './CheckOut.module.css'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/userContext'
import { CartContext } from '../../context/CartContext'
import toast from 'react-hot-toast'

export default function CheckOut() {

    const [apiError, setApiError] = useState(null);
    const [loading, setLoading] = useState(false);
    let { cart , clearCart } = useContext(CartContext);
    let navigate = useNavigate();
    


    async function CheckOut(shippingAddress) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart.cartId}?url=http://localhost:5173`, {
            shippingAddress
        },{
            headers:{
                token:localStorage.getItem('token')
            }
        });
        toast.success('Successfuly Order')
        location.href = data.session.url;
    }
    async function CheckOutCash(shippingAddress) {
        setLoading(true);
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cart.cartId}`, {
            shippingAddress
        },{
            headers:{
                token:localStorage.getItem('token')
            }
        });
        clearCart();
        toast.success('Successfuly Order')
        navigate('/allorders')
    }

    let validationSchema = yup.object().shape({
        city: yup
            .string()
            .required("City is required")
            .matches(/^[\p{L}\s]{2,50}$/u, "Enter a valid city name"),
        
        details: yup
            .string()
            .required("Details are required")
            .min(5, "Details too short")
            .max(100, "Details too long")
            .matches(/^[\w\s.,\-ء-يA-Za-z0-9]{5,100}$/, "Enter valid address details"),
        
        phone: yup
            .string()
            .required("Phone is required")
            .matches(/^01[0125][0-9]{8}$/, "You must enter a valid Egyptian phone number"),
    });

    const formik = useFormik({
        initialValues: {
        city: '',
        details: '',
        phone:''
        },validationSchema,
        onSubmit: CheckOut
    })

    return <>
        <form className="mt-10 md:w-1/2 w-full px-4 mx-auto space-y-6">
            {/* City */}
            <div className="relative z-0 w-full group">
                <input
                    type="text"
                    name="city"
                    id="city"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="city"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                >
                    Enter Your City
                </label>
                {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.city}</p>
                )}
            </div>

            {/* Details */}
            <div className="relative z-0 w-full group">
                <input
                    type="text"
                    name="details"
                    id="details"
                    value={formik.values.details}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="details"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                >
                    Enter Your Details
                </label>
                {formik.touched.details && formik.errors.details && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.details}</p>
                )}
            </div>

            {/* Phone */}
            <div className="relative z-0 w-full group">
                <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-main peer"
                    placeholder=" "
                    required
                />
                <label
                    htmlFor="phone"
                    className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-main"
                >
                    Enter Your Phone
                </label>
                {formik.touched.phone && formik.errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.phone}</p>
                )}
            </div>
        </form>

        {/* Buttons */}
        {loading ? (
            <div className='flex justify-center mt-2'>
                <button className="btn bg-main text-white md:w-[47%] w-full py-2 flex justify-center items-center gap-2">
                    <i className="fas fa-spinner fa-spin"></i> Processing...
                </button>
            </div>
            ) : (
                <div className="flex items-center justify-center gap-4 mt-2">
                    <button
                        type="submit"
                        name="paymentMethod"
                        value="cash"
                        disabled={!(formik.isValid && formik.dirty)}
                        onClick={()=> CheckOutCash()}
                        className="btn bg-main text-white py-2 px-6 rounded disabled:opacity-50 transition"
                    >
                        Pay with Cash
                    </button>
                    <button
                        type="submit"
                        name="paymentMethod"
                        value="visa"
                        onClick={()=> CheckOut()}
                        disabled={!(formik.isValid && formik.dirty)}
                        className="btn bg-blue-600 text-white py-2 px-6 rounded disabled:opacity-50 transition"
                    >
                        Pay with Visa
                    </button>
                </div>
            )}
    </>
}
