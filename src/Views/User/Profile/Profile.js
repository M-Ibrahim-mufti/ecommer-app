import React, { useEffect, useState } from 'react'
import profileImg from "../../../Assets/user-profile.png"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BasicModal from '../../utils/Modal/Modal';
import { AddAPhoto } from '@mui/icons-material';
import SecuritySection from './ProfileComponent/SecuritySection';
import PaymentDetailSection from './ProfileComponent/PaymentDetailSection';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../../slicer/notificationSlicer'
import { showLoader, hideLoader } from '../../../slicer/lodaerSlicer';

const Profile = () => {
    const { id } = useParams()
    const [user, setUserProfile] = useState(null);
    const [currentDetailSection, setCurrentDetailSection] = useState('Personal')
    const [open, setOpen] = useState(false)
    const [changes, setChanges] = useState(false)
    const [editLabels, setEditLabels] = useState('')
    const loader = useSelector((state) => state.loader)
    const dispatch = useDispatch()
    
    useEffect(() => {
        getUserDetail();
    
    }, [])

    const getUserDetail = async () => {
        dispatch(showLoader());
        try  {
            const method = '/userdetail'
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.get(url, {params:{ id:id }});
            setUserProfile(response.data.user);
            dispatch(setNotification({type:'success', message:response.data.message}))
            setTimeout(() => {
                dispatch(hideLoader())
            },2000)
        } catch(error) {
            dispatch(setNotification({type:'danger', message:error.response?.data?.message}))
        }
    }


    const selectImage = async (event) => {
        const file = event.currentTarget.files[0];
        const formData = new FormData();
        formData.append('image', file)
        try{
            const method = '/user/Upload-Image'
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.post(url, formData)
            console.log(response.data);
            setUserProfile(prevProduct => ({
                ...prevProduct,
                Image: response.data
            }))

        } catch(error) {
            console.log('Error in the backend')
        }
    }

    const updateProfile = async () => {
       try {
            
            const method = '/user/update-profile';
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.put(url, user)
            console.log(response);
            window.location.reload();

        } catch (err) {
            console.log(err)
        }
    }

    const handleOpen = () => { setOpen(true); }
    const handleClose = () => { setOpen(false); }

    const updateFields = (event) => {
        setUserProfile((prevProduct) => ({
            ...prevProduct,
            [event.target.name]: event.target.value
        }))
        setChanges(true)
    }

    // if(!user) {
    //     return (<div>Loading</div>)
    // }
    
    return (
       <section className='pt-20'> 
            { user && !loader.isLoading && <div className='container max-w-full mx-auto px-4'>
                <div className='flex gap-3'>   
                    <div className='flex justify-between flex-row flex-wrap w-full'>
                        <div className='w-full border mb-4 rounded-lg '>
                            <div className='bg-primary flex justify-between rounded-t-[6px] py-3'>
                                <h2 className="ml-4 text-white font-bold" >My Details</h2>
                                { changes && <button onClick={updateProfile} className='mr-4 bg-white text-black rounded-md font-bold px-5 py-1' >Save</button> }
                            </div>
                            <div className="py-3 flex gap-4 border-b-2">
                                <div className='w-1/6 text-right flex justify-end'> 
                                    <img className='w-24 h-24 object-cover bg-primary img-shadow rounded-full' src={user.Image !== 'not provided' ? user.Image : profileImg}/>
                                </div>
                                <div className='flex flex-col justify-center w-2/3'>
                                    <h2 className="text-xl font-bold"> {user.UserName} </h2>
                                    <p className='text-muted font-bold text-lg'> {user.Email}</p>
                                    <p className='text-muted font-bold text-lg'> 12 Total Products is uploaded by you </p>
                                </div>
                                <div className='w-1/6 flex flex-row justify-end items-start' >
                                    <button onClick={() => {handleOpen(); setEditLabels('Image-Detail') }} className='py-2 px-4 mr-5 rounded-lg btn-shadows border text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-[49%] border mb-4 rounded-lg'>
                            <div className='bg-primary rounded-t-[6px] py-3'>
                                <h2 className='ml-4 text-white font-bold'> My perosnal Detail </h2>
                            </div>
                            <div className='flex mx-5 my-5 justify-between'>
                                <div className='w-3/4 flex flex-wrap'>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Full Name</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'>{ user.UserName }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Email</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'> { user.Email }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Phone Number</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'>{ user.PhoneNumber }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Role</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'> {user.Role} </h5>
                                    </div>
                                </div>
                                <div className='w-1/4 flex flex-row justify-end items-start'>
                                    <button onClick={() => { handleOpen(); setEditLabels('Confidential-Detail')}} className='py-2 px-4 rounded-lg btn-shadows border text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-[49%] border mb-4 rounded-lg'>
                            <div className='bg-primary rounded-t-[6px] py-3'>
                                <h2 className='ml-4 text-white font-bold'> My Address Detail </h2>
                            </div>
                            <div className='flex mx-5 my-5 justify-between'>
                                <div className='w-3/4 flex flex-wrap'>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Country</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'>{ user.Country }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>City</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'>{ user.City} </h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Address</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'>{ user.Address }</h5>
                                    </div>
                                    <div className='w-1/2 flex flex-col mb-4 gap-2'>
                                        <h5 className='text-muted-dark font-extrabold'>Postal Code</h5>
                                        <h5 className='font-semibold text-muted tracking-wide'> {user.PostalCode} </h5>
                                    </div>
                                </div>
                                <div className='w-1/4 flex flex-row justify-end items-start'>
                                    <button onClick={() => { handleOpen(); setEditLabels('Location-Detail')}} className='py-2 px-4 rounded-lg btn-shadows border text-muted hover:text-black transition-color duration-200 ease-linear'>Edit</button>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex justify-between gap-4'>
                            <PaymentDetailSection />
                            <SecuritySection />
                        </div>
                    </div>
                </div>
            </div>}
            <BasicModal 
                width={700}
                open={open} 
                handleClose={handleClose}
                Header={
                    <div>
                        { editLabels === 'Image-Detail' ? <h2 className='py-4 rounded-t-lg px-4 text-xl font-bold border-b pb-3 bg-primary pt-3 text-white'> Edit Your Profile Image </h2> : null}
                        { editLabels === 'Confidential-Detail' ? <h2 className='py-4 rounded-t-lg px-4 text-xl font-bold border-b pb-3 bg-primary pt-3 text-white'> Edit Your Personal Info </h2> : null}
                        { editLabels === 'Location-Detail' ? <h2 className='py-4 rounded-t-lg px-4 text-xl font-bold border-b pb-3 bg-primary pt-3 text-white'> Edit Your Location Info </h2> : null}
                    </div>
                }
                Content={
                    <div>
                       { editLabels === 'Image-Detail' ? <div className='flex flex-col items-center gap-3 py-4 rounded-b-lg bg-white justify-center'>
                            <img className='w-32 h-32 object-cover rounded-xl' src={user.Image === 'not provided' ? profileImg : user.Image }/>
                            <label className='px-4 py-2 cursor-pointer rounded-xl btn-shadows flex justify-center gap-2 text-white bg-primary item-center' htmlFor="NewProfileImage"> 
                                <AddAPhoto className='text-white' /> Profile Image
                            </label>
                            <input type='file' onChange={selectImage} accept='Image/*' id='NewProfileImage'  hidden />
                        </div>  : editLabels === 'Confidential-Detail' ? <div className='px-4 py-2'>
                            <div className='d-flex flex-col gap-2'>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Name</label>
                                    <input onChange={updateFields} type="text" name='UserName'  defaultValue={user.UserName} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" name='Email' className="block text-md font-medium text-gray-700">Email Address</label>
                                    <input onChange={updateFields} type="email" name='Email' defaultValue={user.Email} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Phone Number</label>
                                    <input onChange={updateFields} type="text" name='PhoneNumber' defaultValue={user.PhoneNumber === 'not provided' ? '' : user.PhoneNumber}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Name</label>
                                    <select onChange={updateFields} name='Role' defaultValue={user.Role} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" >
                                        <option  value='' disabled > Select Account Type </option>
                                        <option> Buyer </option>
                                        <option> Seller </option>
                                        <option> Hybrid </option>
                                    </select>
                                </div>
                            </div>
                        </div> :  editLabels === 'Location-Detail' ? <div className='px-4 py-2'>
                            <div className='d-flex flex-col gap-2'>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Country</label>
                                    <input onChange={updateFields} type="text" name='Country'  defaultValue={user.Country} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" name='Email' className="block text-md font-medium text-gray-700">City</label>
                                    <input onChange={updateFields} type="text" name='City' defaultValue={user.City} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Address</label>
                                    <input onChange={updateFields} type="text" name='Address' defaultValue={user.Address}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="Name" className="block text-md font-medium text-gray-700">Postal Code</label>
                                    <input onChange={updateFields} type="text" name='PostalCode' defaultValue={user.PostalCode}  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                                </div>
                            </div>
                        </div> : null}                   
                    </div>
                }
             />
        </section>
    )
}

export default Profile