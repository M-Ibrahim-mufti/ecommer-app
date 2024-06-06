import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGit, faGoogle  } from "@fortawesome/free-brands-svg-icons";

const SignUp = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword:""
    })

    const setUsersCredentials = (el) => {
        setUser({
            ...user,
            [el.target.name]:el.target.value
        })
        el.target.classList.remove("z-10")
        el.target.nextElementSibling.classList.add('-translate-y-6', 'bg-white', 'z-10', 'px-2', 'transition-all', 'duration-500', 'ease-linear','!text-black','font-bold')
        if(el.target.value === "") {
            el.target.classList.add('z-10');
            el.target.nextElementSibling.classList.remove('-translate-y-6', 'bg-white', 'z-10', 'px-2','!text-black', 'font-bold')
        }
    }
    const onSubmit = () => {
        console.log(user)
    }
    
    
    return(
        <div className="flex w-full h-full flex-col gap-3">
            <div className="w-full">
                <h2 className="text-4xl font-bolder text-center py-4"><strong>Sign</strong> Up</h2>
                <div className="w-2/5 mx-auto flex justify-around">
                    <FontAwesomeIcon className="w-8 h-8 hover:fill-[rgba(86,112,235,1)]" icon={faFacebook}/>
                    <FontAwesomeIcon className="w-8 h-8 hover:fill-[rgba(86,112,235,1)]" icon={faGit}/>
                    <FontAwesomeIcon className="w-8 h-8 hover:fill-[rgba(86,112,235,1)]" icon={faGoogle}/>
                </div>
                <p className="w-3/5 text-center mx-auto py-3 text-[rgba(0,0,0,0.7)]">Enter your credential to get access to our website or login through your socials</p>
            </div>
            <div className="w-4/5 mx-auto flex flex-col gap-4">
                <div className="relative flex w-full">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#c5c5c5] rounded-l-lg">
                        <svg  className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path fill="#ffffff" d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/>
                        </svg>
                    </div>
                    <input name="name" onChange={setUsersCredentials} className="text-fields w-full outline-none h-12 border rounded-r-lg border-l-0 px-2 bg-transparent z-10" />
                    <h2 className="absolute top-1/4 left-14 text-[#999]">Name</h2>
                </div>
                <div className="relative flex w-full">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#c5c5c5] rounded-l-lg">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/>
                        </svg>
                    </div>
                    <input type="email" name="email" onChange={setUsersCredentials} className="text-fields w-full outline-none h-12 border rounded-r-lg px-2 border-l-0 bg-transparent z-10"/>
                    <h2 className="absolute top-1/4 left-14 text-[#999]">Email</h2>                    
                </div>
                <div className="relative flex w-full">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#c5c5c5] rounded-l-lg">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                        </svg>
                    </div>
                    <input type="password" name="password" onChange={setUsersCredentials} className="text-fields w-full outline-none h-12 border rounded-r-lg px-2 border-l-0 bg-transparent z-10"/>
                    <h2 className="absolute top-1/4 left-14 text-[#999]">Password</h2>
                </div>
                <div className="relative flex w-full">
                    <div className="w-12 h-12 flex justify-center items-center bg-[#c5c5c5] rounded-l-lg">
                        <svg className="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path fill="#ffffff" d="M336 352c97.2 0 176-78.8 176-176S433.2 0 336 0S160 78.8 160 176c0 18.7 2.9 36.8 8.3 53.7L7 391c-4.5 4.5-7 10.6-7 17v80c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V448h40c13.3 0 24-10.7 24-24V384h40c6.4 0 12.5-2.5 17-7l33.3-33.3c16.9 5.4 35 8.3 53.7 8.3zM376 96a40 40 0 1 1 0 80 40 40 0 1 1 0-80z"/>
                        </svg>
                    </div>
                    <input type="password" name="confirmPassword" onChange={setUsersCredentials} className="text-fields w-full outline-none h-12 border rounded-r-lg px-2 border-l-0 bg-transparent z-10"/>
                    <h2 className="absolute top-1/4 left-14 text-[#999]">Confirm Password</h2>
                </div>
                <div className="text-center">
                    <button onClick={onSubmit} className="w-36 h-10 text-xl font-bold rounded-3xl text-white bg-[rgba(86,112,235,1)] hover:bg-[#465abe] transition-all duration-500 ease-linear">Register</button>
                </div>
            </div>
            <div className="w-4/5 mx-auto text-center">
                <h2>Already Have an account<button className="pl-1 font-bold hover:text-[rgba(86,112,235,1)] transition-colors duration-500 ease-linear">Sign In</button> now </h2>
            </div>
        </div>
    )
}

export default SignUp