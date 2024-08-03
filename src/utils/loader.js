import {useState, useEffect} from 'react';
import { useSelector } from 'react-redux'
import './utils.css'

const Loader = ( ) => {
    const loading = useSelector((state) => state.loader)
    useEffect(() => {
        console.log("boolean check", loading.isLoading) 

    },[loading])

    return (
        <div >
            {loading.isLoading !== false ? <div className='absolute top-1/2 left-1/2 translate-x-1/2 translate-y-1/2'  >
                <div className="loader">
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                    <div className="bubble"></div>
                </div>
            </div> : null}
        </div>
    )
}

export default Loader