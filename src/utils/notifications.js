import {useState, useEffect} from 'react';

const NotficationMessages = (props) => {
    
    const [messageType, setMessageType] = useState('');
    const [message, setMessage] = useState('')

    useEffect(() => {
        if(props.type) {
           setMessageType(props.type)
           console.log('triggered')
        }
        if (props.message) {
            setMessage(props.message)
            console.log('triggered')

        }
        setTimeout(() => {
            setMessageType('');
            setMessage('');
        },4000)

    },[props.type, props.nessage])

    return (
        <div id="notification" className={`top-4 z-50 right-5 fixed rounded-lg transition-all duration-300 linear ${message === '' && messageType === '' ? 'opacity-0' : 'opacity-1'}
        bg-opacity-50 ${messageType === 'success' ? 'bg-green-300' : messageType === 'danger' ? 'bg-red-300' : messageType === 'warning' ? 'bg-yellow-300' : ''}
        `}>
            <div className={`py-5 px-4 `}>
                <h5>{message}</h5>
            </div>
        </div>
    )
}

export default NotficationMessages