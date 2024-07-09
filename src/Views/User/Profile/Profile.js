import React, { useEffect, useState } from 'react'
import profileImg from "../../../Assets/user-profile.png"
import axios from 'axios';
import { useParams } from 'react-router-dom';


const Profile = () => {
    const { id } = useParams()
    const [user, setUserProfile] = useState(null);
    const [currentDetailSection, setCurrentDetailSection] = useState('Personal')

    const getUserDetail = async () => {
            const method = '/userdetail'
        const url = process.env.REACT_APP_SERVER_URL + method
        const response = await axios.get(url, {params:{ id:id }} );
        console.log(response.data)
        setUserProfile(response.data);
    }

    useEffect(() => {
      getUserDetail();

    }, [])
    
    if(!user) {
        return (<div>Loading</div>)
    }

    return (
        <section className='pt-20'> 
            <div className='container mx-auto py-6 px-4'>
                <div className='flex gap-3'>   
                    <div className='w-1/4 border-2 rounded-lg '>
                        <div className=' w-full flex flex-col'>
                            <h2 className='text-center bg-primary py-3 px-4 rounded-t-[6px] font-bold text-white '> Select Detail </h2>
                            <div className='flex flex-col'>
                                <a onClick={() => setCurrentDetailSection('Personal')} className={`py-2 w-full text-center hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 linear ${currentDetailSection === 'Personal' ? 'bg-black bg-opacity-40 text-white' : ''} `} >
                                    <p>Personal Details</p> 
                                </a>
                                <a onClick={() => setCurrentDetailSection('Security')} className={`py-2 w-full text-center hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 linear ${currentDetailSection === 'Security' ? 'bg-black bg-opacity-40 text-white' : ''} `}>
                                    <p>Security Details</p> 
                                </a>
                                <a onClick={() => setCurrentDetailSection('Payment')} className={`py-2 w-full text-center hover:bg-black hover:bg-opacity-40 hover:text-white transition-all duration-200 linear ${currentDetailSection === 'Payment' ? 'bg-black bg-opacity-40 text-white' : ''} `}>
                                    <p>Payment Details</p> 
                                </a>
                            </div>
                        </div>
                    </div> 
                    <div className='flex flex-col w-full'>
                        <div className='w-full border-2 mb-4 rounded-lg '>
                            <div className='bg-primary rounded-t-[6px] py-3'>
                                <h2 className="ml-4 text-white font-bold" >My Details</h2>
                            </div>
                            <div className="py-3 flex gap-4 border-b-2">
                                <div className='w-1/6 text-right flex justify-end'> 
                                    <img className='w-24 h-24 object-cover bg-primary img-shadow rounded-full' src={profileImg}/>
                                </div>
                                <div className='flex flex-col justify-center w-2/3'>
                                    <h2 className="text-xl font-bold"> {user.UserName} </h2>
                                    <p className='text-muted font-bold text-lg'> {user.Email}</p>
                                    <p className='text-muted font-bold text-lg'> 12 Total Products is uploaded by you </p>
                                </div>
                                <div className='w-1/6 flex flex-row justify-end items-start' >
                                    <button className='py-2 px-4 mr-5 rounded-lg btn-shadows border-2 text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div>
                        {currentDetailSection === "Personal" && <div className='w-full border-2 mb-4 rounded-lg'>
                            <div className='bg-primary rounded-t-[6px] py-3'>
                                <h2 className='ml-4 text-white font-bold'> My perosnal Detail </h2>
                            </div>
                            <div className='flex mx-5 my-5 justify-between'>
                                <div className='w-3/4 flex flex-wrap'>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Full Name</h5>
                                        <h5 className='font-semibold tracking-wide'>{ user.UserName }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Email</h5>
                                        <h5 className='font-semibold tracking-wide'> { user.Email }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Phone Number</h5>
                                        <h5 className='font-semibold tracking-wide'>{ user.PhoneNumber }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Role</h5>
                                        <h5 className='font-semibold tracking-wide'> {user.Role} </h5>
                                    </div>
                                </div>
                                <div className='w-1/4 flex flex-row justify-end items-start'>
                                    <button className='py-2 px-4 rounded-lg btn-shadows border-2 text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div> }

                        { currentDetailSection === 'Personal' &&  <div className='w-full border-2 mb-4 rounded-lg'>
                            <div className='bg-primary rounded-t-[6px] py-3'>
                                <h2 className='ml-4 text-white font-bold'> My Address Detail </h2>
                            </div>
                            <div className='flex mx-5 my-5 justify-between'>
                                <div className='w-3/4 flex flex-wrap'>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Country</h5>
                                        <h5 className='font-semibold tracking-wide'>{ user.Country }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>City</h5>
                                        <h5 className='font-semibold tracking-wide'> Some City</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Address</h5>
                                        <h5 className='font-semibold tracking-wide'>{ user.Address }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted font-extrabold'>Postal Code</h5>
                                        <h5 className='font-semibold tracking-wide'> Some Numbers </h5>
                                    </div>
                                </div>
                                <div className='w-1/4 flex flex-row justify-end items-start'>
                                    <button className='py-2 px-4 rounded-lg btn-shadows border-2 text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Profile