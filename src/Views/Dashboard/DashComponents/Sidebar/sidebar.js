import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { GridViewOutlined, ShoppingBagOutlined,AddBoxOutlined ,Menu, Close, FormatListBulleted } from "@mui/icons-material"
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = (props) => {

    const currentUser = useSelector((state) => state.user)
    const [sideState, setSideState] = useState(false);
    

    const toggleSidebar = (event) => {
        const button = event.currentTarget
        setSideState(prevSideState => {
            const toggleState = !prevSideState;
            const sidebarCont = document.getElementById('sideBarCont');
            const sidebarUserDetail = document.getElementById('sideUserDetail');
            const sidebarComponentLinks = document.getElementById('sideComponentLinks');
            if (!toggleState) {
                // container styling
                sidebarCont.classList.remove('w-64');
                sidebarCont.classList.add('w-20');
        
                // userDetail container styling
                sidebarUserDetail.classList.remove('p-4');
                sidebarUserDetail.classList.add('py-2');
                sidebarUserDetail.firstChild.firstChild.classList.remove('w-1/6');
                sidebarUserDetail.firstChild.firstChild.classList.add('w-full', 'mx-auto', 'flex', 'justify-center'); 
                sidebarUserDetail.firstChild.childNodes[1].classList.add('hidden');
            
                // componentLink container styling
                sidebarComponentLinks.classList.remove('p-4');
                sidebarComponentLinks.classList.add('py-2');
                sidebarComponentLinks.firstChild.childNodes[0].classList.add('hidden');
                sidebarComponentLinks.firstChild.childNodes[1].classList.remove('w-2/5');
                sidebarComponentLinks.firstChild.childNodes[1].classList.add('w-full', 'text-xs');
                sidebarComponentLinks.firstChild.childNodes[2].classList.add('hidden');
                const links = Array.from(sidebarComponentLinks.childNodes[1].childNodes);
                links.forEach((link) => {
                    setTimeout(() => {  
                        link.childNodes[1].classList.add('hidden');
                    },250);
                    link.childNodes[1].classList.remove('opacity-100');
                    link.childNodes[1].classList.add('opacity-0');
                    link.firstChild.classList.remove('w-1/5');
                    link.firstChild.classList.add('w-full');
                })
                setTimeout(() => {
                    button.parentElement.classList.remove('justify-end');
                    button.parentElement.classList.add('justify-center');
                },300);
            }
            else {
                // container styling
                sidebarCont.classList.add('w-64');
                sidebarCont.classList.remove('w-20');
        
                // userDetail container styling
                sidebarUserDetail.classList.add('p-4');
                sidebarUserDetail.classList.remove('py-2');
                sidebarUserDetail.firstChild.firstChild.classList.add('w-1/6');
                sidebarUserDetail.firstChild.firstChild.classList.remove('w-full', 'mx-auto', 'flex', 'justify-center'); 
                sidebarUserDetail.firstChild.childNodes[1].classList.remove('hidden');
            
                // componentLink container styling
                sidebarComponentLinks.classList.add('p-4');
                sidebarComponentLinks.classList.remove('py-2');
                sidebarComponentLinks.firstChild.childNodes[0].classList.remove('hidden');
                sidebarComponentLinks.firstChild.childNodes[1].classList.add('w-2/5');
                sidebarComponentLinks.firstChild.childNodes[1].classList.remove('w-full', 'text-xs');
                sidebarComponentLinks.firstChild.childNodes[2].classList.remove('hidden');
                const links = Array.from(sidebarComponentLinks.childNodes[1].childNodes);
                links.forEach((link) => {
                    setTimeout(() => {  
                        link.childNodes[1].classList.remove('opacity-0');
                        link.childNodes[1].classList.add('opacity-100');
                    },250);
                    link.childNodes[1].classList.remove('hidden');
                    link.firstChild.classList.add('w-1/5');
                    link.firstChild.classList.remove('w-full');
                })
                button.parentElement.classList.add('justify-end');
                button.parentElement.classList.remove('justify-center');
            }
            return toggleState;
        });
    }


    return (
        <div id="sideBarCont" className="flex-shrink-0 w-20 overflow-hidden z-[51] sticky top-0 h-screen transition-all duration-300 ease-linear">
            <aside className="h-full bg-[rgb(43,43,40)] flex flex-col rounded-tr-md rounded-br-md">
                <div className="text-right flex items-center justify-center py-2 px-4 ">
                    <button className="group p-2 hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear rounded-lg" onClick={toggleSidebar} >
                        { sideState ? <Close className="group-hover:text-opacity-100 text-white text-opacity-75 !w-[35px] !h-[35px]"/> : <Menu className="group-hover:text-opacity-100 text-white text-opacity-75 !w-[35px] !h-[35px]"/>  }
                    </button>
                </div>
                <Link to={`/user/profile/${currentUser.user_id}`} id="sideUserDetail" className="cursor-pointer mt-4 py-2 mx-2 hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear rounded-lg">
                    <div className="flex gap-6 items-center">
                        <div className="w-full mx-auto flex justify-center">
                            <Avatar className="border-2 border-pink-400 !w-[50px] !h-[50px] font-bold !bg-white !text-black" > {currentUser.UserName.charAt(0).toUpperCase()} </Avatar>
                        </div>
                        <div className="w-auto hidden text-white">
                            <h2 className="font-extrabold">{currentUser.UserName}</h2>
                            <p className="text-white text-sm text-opacity-75">{currentUser.Email}</p>
                        </div>
                    </div>
                </Link>
                <div id="sideComponentLinks" className="py-2 mt-4 mx-2" >
                    <div className="flex mb-5 justify-between items-center">
                        <hr className="w-1/4 hidden opacity-50" />
                        <h2 className="w-full text-xs text-white text-opacity-50 text-center">Components</h2>
                        <hr className="w-1/4 hidden opacity-50" />
                    </div>
                    <div className="mb-3 gap-2 flex flex-col">
                        <Link to="/" className="group flex justify-start gap-3 px-3 py-2 rounded-lg items-center hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear">
                            <div className="w-full text-center">
                                <GridViewOutlined className="group-hover:text-opacity-100 opacity-100 transition-all duration-200 ease-linear text-opacity-75 text-white rounded-lg !w-[30px] !h-[30px]"/>
                            </div>
                            <h2 className="hidden opacity-0 group-hover:text-opacity-100 transition-all duration-200 ease-linear w-3/5 text-opacity-75 text-white font-bold tracking-wider">Dashboard</h2>
                        </Link>
                        <Link to="/product/user-products" className="group flex justify-start gap-3 px-3 py-2 rounded-lg items-center hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear">
                            <div className="w-full text-center">
                                <ShoppingBagOutlined className="group-hover:text-opacity-100 opacity-100 transition-all duration-200 ease-linear text-opacity-75 text-white rounded-lg !w-[30px] !h-[30px]"/>
                            </div>
                            <h2 className="hidden opacity-0 group-hover:text-opacity-100 transition-all duration-200 ease-linear w-3/5 text-opacity-75 text-white font-bold tracking-wider">All Product</h2>
                        </Link>
                        { currentUser.Role !== 'Buyer' &&  
                        <Link to="/product/add-product" className="group flex justify-start gap-3 px-3 py-2 rounded-lg items-center hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear">
                            <div className="w-full text-center">
                                <AddBoxOutlined className="group-hover:text-opacity-100 opacity-100 transition-all duration-200 ease-linear text-opacity-75 text-white rounded-lg !w-[30px] !h-[30px]"/>
                            </div>
                            <h2 className="hidden opacity-0 group-hover:text-opacity-100 transition-all duration-200 ease-linear w-3/5 text-opacity-75 text-white font-bold tracking-wider">Add Product</h2>
                        </Link>}
                        { currentUser.Role !== 'Buyer' &&  
                        <Link  to={`/user/your-products/${currentUser.user_id}`} className="group flex justify-start gap-3 px-3 py-2 rounded-lg items-center hover:bg-black hover:bg-opacity-20 transition-all duration-300 ease-linear">
                            <div className="w-full text-center">
                                <FormatListBulleted className="group-hover:text-opacity-100 opacity-100 transition-all duration-200 ease-linear text-opacity-75 text-white rounded-lg !w-[30px] !h-[30px]"/>
                            </div>
                            <h2 className="hidden opacity-0 group-hover:text-opacity-100 transition-all duration-200 ease-linear w-3/5 text-opacity-75 text-white font-bold tracking-wider">My Products</h2>
                        </Link>}
                        
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
