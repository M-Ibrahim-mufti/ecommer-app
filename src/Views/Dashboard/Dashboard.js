import React, { useEffect } from "react";
import DashHeader from "./DashComponents/Header";
import HeaderImage from '../../Assets/product image/pngegg.png' 
import EmblemSections from "./DashComponents/Sections";
import { useSelector } from "react-redux";
const Dashboard = () => {
    const currentUser = useSelector(state => state.user)
    useEffect(() => {
        console.log(currentUser)
    },[])
    return (
        <div className="py-20">
            <DashHeader/>
            {/* <div className="w-full py-5 bg-white">
                <EmblemSections/>
            </div> */}
            <div className="max-h-52 h-full">
                <p>Hello pakistan</p>
            </div>
        </div>
    );
}

export default Dashboard