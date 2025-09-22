import React from 'react'
import style from './Home.module.css'
import RecentProduct from '../RecentProduct/RecentProduct'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'

export default function Home() {
return <>
    <MainSlider />
    <CategorySlider/>
    <RecentProduct/>
</>
}
