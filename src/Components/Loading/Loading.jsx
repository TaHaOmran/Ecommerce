import React from 'react'
import style from './Loading.module.css'
import { HashLoader } from 'react-spinners';

export default function Loading() {
    const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};
return <>
    <div className="sweet-loading py-10">
        <HashLoader
            color={'#0aad0a'}
            cssOverride={override}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
</>
}
