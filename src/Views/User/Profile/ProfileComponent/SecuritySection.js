import axios from 'axios';
import {useState} from 'react';

const SecuritySection = (props) => {
    const [password, setPassword] = useState({
        currentPassword: '',
        newPassword: '',
        reNewPassword: ''
    });

    const setFields = (event) => {
        setPassword((prevPassword) => ({
            ...prevPassword,
            [event.target.name]: event.target.value
        }))
    } 

    const changePassword = async () => {
        const method = '/user/change-password'
        const url = process.env.REACT_APP_SERVER_URL + method
        try {
            if(!password.currentPassword || !password.newPassword || !password.reNewPassword ) {
                throw new Error("Fields can not be blanked");
            }
            if (password.newPassword !== password.reNewPassword) {
                throw new Error("Password does not match please try again");
            }
            const response = await axios.put(url,{password:password, id:props.userId})
            props.triggerNotification('success', response.data.message) 

        } catch (error) {
            // console.log(error.response)
            props.triggerNotification('danger',  error.response?.data?.message || error.message)
        }
    }

    return (
        <div className='w-[49%]'>
            <div className='bg-primary rounded-t-[6px] py-3'>
                <h2 className='ml-4 text-white font-bold'> Security Detail </h2>
            </div>
            <div className='flex flex-col px-5 py-5 border-l border-r border-b rounded-lg'>
                <h2 className='text-2xl mb-3 text-muted-dark font-extrabold'> Change your password </h2>
                <div className='flex flex-col mb-3'>
                    <div className="mb-4">
                        <label htmlFor="CurrentPassword" className="block text-md font-medium text-gray-700">Enter Current Password</label>
                        <input onChange={setFields} type="password" name='currentPassword' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="NewPassoword" className="block text-md font-medium text-gray-700">Enter New Password</label>
                        <input onChange={setFields} type="password" name='newPassword' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="ReNewPassword" className="block text-md font-medium text-gray-700">Re-Enter New Password</label>
                        <input onChange={setFields} type="password" name='reNewPassword' className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                    </div>
                </div>
                <div className='mb-3'>
                    <button onClick={changePassword} className='px-7 py-2 bg-primary rounded-lg text-muted font-semibold hover:text-white hover:font-bold transition-all duration-300 ease-linear' > Change Password </button>
                </div>
            </div>
        </div>
    )
}

export default SecuritySection