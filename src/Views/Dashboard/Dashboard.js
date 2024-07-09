import React from "react";
import DashHeader from "./DashComponents/Header";
import EmblemSections from "./DashComponents/Sections";
const Dashboard = () => {
    return (
        <div className="py-14">
            <DashHeader/>
            <div className="w-full py-5 bg-white">
                <EmblemSections/>
            </div>

        </div>
    );
}

export default Dashboard