import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { ShoppingCartCheckoutOutlined } from "@mui/icons-material";
import Dropdown from "./DropdownMenu";
import axios from 'axios'   

const Navbar = () => {

    const signOut = async () => { 
        const method = "/logout"
        const url = process.env.REACT_APP_SERVER_URL + method
        const response = await axios.post(url)
        if(response.data.success) {
            localStorage.clear();
            window.location.reload();
        }
    }

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
                    <div className="py-3 px-3 rounded-lg cursor-pointer hover:bg-[rgba(128,0,0,0.5)] transiton-all duration-300 ease-linear">
                        <ShoppingCartCheckoutOutlined className='text-white'/>
                    </div>
                </div>
            </div>
        </nav>
    )
}
export default Navbar