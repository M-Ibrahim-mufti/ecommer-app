import React, { useState } from "react";
import { Link } from 'react-router-dom'
import Dropdown from "./DropdownMenu";
import axios from 'axios'

const Navbar = (props) => {
    const [user, setUser] = useState(props.user);

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
        <nav className="fixed w-screen h-14 bg-primary">
            <div className="container flex max-w-6xl h-full mx-auto items-center">
                <div className="text-white w-1/4 flex justify-center items-center">
                    <h2 className="text-3xl">E-APP</h2>
                </div>
                <ul className="w-1/2 flex justify-end gap-9 items-center">
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/'>Dashboard</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/Products'>Products</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/Blogs'>Blogs</Link></li>
                    <li className="text-white hover:font-bold transition-all duration-500 ease-linear"><Link to='/About'>About</Link></li>
                </ul>
                <div className="w-1/5 flex justify-center text-clip ">
                    <Dropdown numberOfItems={5} UserName={user.user.UserName.charAt(0).toUpperCase()} signOut={signOut} />
                </div>
            </div>
        </nav>
    )
}
export default Navbar