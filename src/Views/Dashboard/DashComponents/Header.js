import React from 'react';
import '../Dashboard.css'
import HeaderImage from '../../../Assets/DashHeader.png' 

const DashHeader = () => {
    return(
        <div className='w-full relative '>
            <div className='text-white absolute z-10 header-text'>
                <div className='container max-w-xl text-center'>
                    <h2 className='text-4xl font-bold'>Welcome To <span className="italic">E-APP</span></h2>
                    <p className='text-xl'>Enjoy 100% quality base product and Buy the best product that catches your eye</p> 
                </div>
            </div>
        </div>
    )
}
export default DashHeader   