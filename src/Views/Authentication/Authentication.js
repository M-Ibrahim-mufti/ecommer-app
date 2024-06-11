import React from "react";
import SignUp from "./AuthComponents/SignUp";
import SignIn from "./AuthComponents/SignIn";
import './Authentication.css'


const Authentication = () => {
    const movingSideBox = (event) => {
        const sideBox = event.target.parentElement.parentElement
        const signUpBox = document.getElementById('sign-up')
        const signInBox = document.getElementById('sign-in')
        const signUpBtn = document.getElementById('sign-up-btn-cont');
        const signInBtn = document.getElementById('sign-in-btn-cont');
        const purpleBg = document.getElementById('purple-bg');

        if (event.target.textContent === 'Sign In'){
            purpleBg.classList.remove('translate-x-0')
            purpleBg.classList.add('translate-x-[1120px]', "transition-all", 'duration-1000', 'ease-linear');
            sideBox.classList.remove('side-box-right')
            sideBox.classList.add('side-box-left')
            signInBtn.classList.add('hidden')
            signUpBtn.classList.remove('hidden')

            signUpBox.classList.add('sign-up-box-hidden-animation')
            signUpBox.classList.remove('sign-up-box-animation')
            
            setTimeout(() => {
                signUpBox.classList.add('hidden')
                signInBox.classList.remove("hidden", 'opacity-0')
                signInBox.classList.add('sign-in-box-animation')
                signInBox.classList.remove('sign-in-box-hidden-animation')
            },350)
        } 
        if (event.target.textContent === 'Sign Up'){
            purpleBg.classList.remove('translate-x-[1120px]')
            purpleBg.classList.add('translate-x-0') 
            sideBox.classList.remove('side-box-left')
            sideBox.classList.add('side-box-right')
            signUpBtn.classList.add('hidden')
            signInBtn.classList.remove('hidden')
            signInBox.classList.add('sign-in-box-hidden-animation') 
            signInBox.classList.remove('sign-in-box-animation')
            setTimeout(() => {
                signInBox.classList.add('hidden');
                signUpBox.classList.remove('hidden');
                signUpBox.classList.add('sign-up-box-animation')
                signUpBox.classList.remove('sign-up-box-hidden-animation')
            },350)
        }
    }

    return(
        <div className="w-screen h-screen">
            <div id="purple-bg" className="-z-10 absolute h-screen w-5/12 bg-[rgba(86,112,235,1)]"></div>
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="container max-w-4xl flex mx-auto rounded-3xl h-[600px] shadows bg-white">
                    <div className="bg-[rgba(86,112,235,1)] max-w-[288px] w-full flex justify-center items-center rounded-l-2xl py-5">
                        <div id="sign-in-btn-cont" className="w-3/4 mx-auto text-white text-center">
                            <h2 className="mb-4">If you are already Part of our journey no need to be here click below and Log In now</h2>
                            <button onClick={movingSideBox} className="w-32 h-10 align-middle border-2 border-white rounded-3xl hover:font-bold hover:border-4 transition-all duration-500 ease-linear">Sign In</button>
                        </div>
                        <div id="sign-up-btn-cont" className="w-3/4 mx-auto text-white text-center hidden" >
                            <h2 className="mb-4">Hello Rookie not a user yet don't worry sign Up Now and have fun with us in out website</h2>
                            <button onClick={movingSideBox} className="w-32 h-10 align-middle border-2 border-white rounded-3xl hover:font-bold hover:border-4 transition-all duration-500 ease-linear">Sign Up</button>
                        </div>
                    </div>
                    <div id="sign-up" className="flex justify-center w-full py-5">
                        <SignUp/>
                    </div>
                    <div id="sign-in" className="hidden flex justify-center w-full py-5">
                        <SignIn/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Authentication