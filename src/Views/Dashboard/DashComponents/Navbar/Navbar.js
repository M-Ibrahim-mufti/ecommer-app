import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import Dropdown from "./DropdownMenu";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";   
import { setIsCart } from '../../../../slicer/CartSlicer'
import { setTotalNumberOfProductCheckout, setTotalProductCheckout } from "../../../../slicer/TotalCheckout";
import '../../Dashboard.css'
const Navbar = () => {
    const isCart = useSelector(state => state.cart);
    const user = useSelector(state => state.user)
    const totalNumberOfCheckoutProduct = useSelector(state => state.totalNumberOfCheckout);


    const totalCheckoutProduct = useSelector(state => state.totalNumberOfCheckout)
    const dispatch = useDispatch();
    
    const getAllCheckOutProduct = async () => {
        const method = '/Cart/AllCheckOutProductLength'
        const url = process.env.REACT_APP_SERVER_URL + method;
        const response = await axios.get(url, { params:{
            id:user.user_id
        }});

        if(response.status === 200) {
            console.log(response.data)
            dispatch(setTotalNumberOfProductCheckout(response.data.totalNumberOfUserProductCarted))
            dispatch(setTotalProductCheckout(response.data.totalUserProductCarted))
        }
    }

    const signOut = async () => { 
        const method = "/logout"
        const url = process.env.REACT_APP_SERVER_URL + method
        const response = await axios.post(url)
        if(response.data.success) {
            localStorage.clear();
            window.location.reload();
        }
    }

    useEffect(() => {
        getAllCheckOutProduct();
    },[])

    useEffect(() => {
        console.log(totalCheckoutProduct)
    },[totalCheckoutProduct])

    return(
        <nav className="!z-50 fixed w-screen h-14 bg-primary">
            <div className="container flex max-w-full h-full mx-auto items-center">
                <div className="text-white w-1/4 flex justify-end items-center">
                    <h2 className="text-3xl">E-APP</h2>
                </div>
                <ul className="w-1/2 flex justify-end gap-9 items-center">
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/'>Dashboard</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/product/user-products'>Products</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/Blogs'>Blogs</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/About'>About</Link></li>
                    <div className="flex justify-center text-clip ">
                        <Dropdown numberOfItems={5} signOut={signOut} />
                    </div>
                </ul>
                <div className="w-1/4 flex items-center justify-end pr-14">
                    <div onClick={() => dispatch(setIsCart(!isCart))} className="py-3 px-3 rounded-lg cursor-pointer hover:bg-[rgba(128,0,0,0.5)] transiton-all duration-300 ease-linear">
                        <div data-text={totalNumberOfCheckoutProduct} className={`${totalNumberOfCheckoutProduct > 0 ? 'NOCP' : ''}`}><ShoppingBagOutlinedIcon  className='text-white'/></div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar