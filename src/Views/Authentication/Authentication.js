import React from "react";
import SignUp from "./AuthComponents/SignUp";

const Authentication = () => {
    return(
        <div className="w-screen h-screen">
            <div className="-z-10 absolute h-screen w-5/12 bg-[rgba(86,112,235,1)]"></div>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="container max-w-4xl flex mx-auto rounded-3xl shadows bg-white">
                    <div className="bg-[rgba(86,112,235,1)] max-w-[288px] w-full flex justify-center items-center rounded-l-2xl py-5">
                        <div className="w-3/4 mx-auto text-white text-center">
                            <h2 className="mb-4">If you are already Part of our journey no need to be here click below and Log In now</h2>
                            <button className="w-32 h-10 align-middle border-2 border-white rounded-3xl hover:font-bold hover:border-4 transition-all duration-500 ease-linear">Sign In</button>
                        </div>
                    </div>
                    <div className="flex justify-center w-full py-5">
                        <SignUp/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication