import {useState, useEffect} from 'react';
import { Close, Done, PriorityHigh } from '@mui/icons-material'


const NotficationMessages = (props) => {
    
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('')

    useEffect(() => {
        if(props.type) {
           setMessageType(props.type)
        }
        if (props.message) {
            setMessage(props.message)
        }
        setTimeout(() => {
            setMessageType('');
            setMessage('');
        },4000)

    },[props.type, props.nessage])

    return (
        <div id="notification" onClick={() => {setMessageType(''); setMessage('')} } className={`top-4 z-[9999] right-5 fixed rounded-lg transition-all duration-300 linear ${message === '' && messageType === '' ? 'opacity-0' : 'opacity-1'}
         ${messageType === 'success' ? 'bg-green-600' : messageType === 'danger' ? 'bg-red-600' : messageType === 'warning' ? 'bg-yellow-600' : ''}
        `}>
            <div className={`py-5 px-4 `}>
                <h5 className='text-white flex items-center '>
                    {messageType === 'success' ? <Done className='text-green-800 mr-3'/> : messageType === 'danger' ? <Close className="text-red-800 mr-3"/> : messageType === 'warning' ? <PriorityHigh className='text-yellow-800 mr-3'/> : null }    
                    {message}
                </h5>
            </div>
        </div>
    )
}

export default NotficationMessages