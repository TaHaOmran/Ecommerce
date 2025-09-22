import React from 'react'
import styles from './NotFound.module.css'
import notFoundImg from '../../assets/error.svg'

export default function NotFound() {
    return <>
        <div className="flex justify-center">
            <div className="w-11/12 md:w-10/12 lg:w-8/12">
                <img className="w-full" style={{ height: 'auto' }} src={notFoundImg} alt="Not Found" />
            </div>
        </div>
    </>
}
