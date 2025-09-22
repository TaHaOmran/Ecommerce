import React from 'react';
import styles from './Footer.module.css';
import amazonPay from '../../assets/images/Amazon_Pay_logo.png'
import masterCard from '../../assets/images/MasterCard-Logo.png'
import payPal from "../../assets/images/PayPal.png"
import googlePlay from "../../assets/images/get-it-on-google-play-badge.png"
import appleStore from "../../assets/images/get-it-on-apple-store.png"

export default function Footer() {
    return (
        <div className="w-full bg-gray-100 py-3">
            <div className="container mx-auto my-5">
                <footer className="flex flex-col gap-y-6">
                    <div className="text-center">
                        <h5 className="text-2xl font-bold">Get the FreshCart app</h5>
                        <h6 className="text-gray-600">
                            We will send you a link, open it on your phone to download the app
                        </h6>
                    </div>
                    <div className="w-full">
                        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                            <input
                                className="w-full md:w-3/4 lg:w-4/5 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type="text"
                                placeholder="Email .."
                            />
                            <button className="focus:ring-0 w-full md:w-1/4 lg:w-1/5 bg-main text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                                Share App Link
                            </button>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 my-4"></div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
                        <div className="w-full md:w-1/2">
                            <div className="flex items-center">
                                <div className="w-full md:w-1/3 p-0">Payment Partners</div>
                                <div className="w-1/12 p-0 mr-2">
                                    <img className="w-full" src={amazonPay} alt="Amazon Pay" />
                                </div>
                                <div className="w-1/12 p-0 mr-2">
                                    <img className="w-full" src={masterCard} alt="MasterCard" />
                                </div>
                                <div className="w-1/12 p-0 mr-2">
                                    <img className="w-full" src={payPal} alt="PayPal" />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-end gap-y-2 md:gap-y-0 md:gap-x-4 w-6/12">
                            <div className="flex gap-x-2">
                                <img className="w-24" src={appleStore} alt="Apple Store" />
                                <img className="w-24" src={googlePlay} alt="Google Play" />
                            </div>
                            <span className="text-gray-600">Get deliveries with FreshCart</span>
                        </div>
                    </div>
                    <div className="border-t border-gray-300 my-4"></div>
                </footer>
            </div>
        </div>
    );
}