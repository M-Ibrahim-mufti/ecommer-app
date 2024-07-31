import { useState, useEffect } from 'react'
import MasterCard from '../../../../Assets/CardLogos/master-card.svg'
import VisaCard from '../../../../Assets/CardLogos/visa-card.svg'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers'
import '../Profile.css'
import axios from 'axios';

const PaymentDetailSection = (props) => {
    const [cardDetails, setCardDetails] = useState({
        NameOnCard: '',
        CardNumber: '',
        ExpiryDate:null,
        Cvv:'',
        CardType:''
    });

    const [cardType, setCardType] = useState("");


    const setFields = (event) => {
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            [event.target.name]: event.target.value
        }))
        if(event.target.name === 'CardNumber') {
            if(event.target.value.charAt(0) === '5'){
                setCardType('Master')
            }
            else if (event.target.value.charAt(0) === '4') {
                console.log('visa')
                setCardType('Visa')
            }
            else {
                setCardType('');
            }
        }
    }

    useEffect(() => {
        getCurrentCardDetails();
    },[])

    const expirySet = (date) => {
        setCardDetails((prevDetails) => ({
            ...prevDetails,
            Expiry: (date.getMonth() + 1).toString().padStart(2, '0') + '/' + date.getFullYear()
        }))
    }

    const submitPaymentDetails = async () => {
        try {
            cardDetails.Type = cardType
            if(cardDetails.CardNumber.length !== 16 || (cardDetails.CVV.length <= 3 && cardDetails.length >=4)) {
                throw new Error('Invalid Card Details')
            }
            const method = '/card/add-details'
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.post(url, {card:cardDetails, id:props.userId});
            props.triggerNotification('success', response.data.message)
            
        } catch(error) {
            props.triggerNotification('danger', error.response?.date?.message || error.message)
        }
    }

    const getCurrentCardDetails = async () => {
        const method = "/card/fetch-details"
        const url = process.env.REACT_APP_SERVER_URL + method
        try {
            const response = await axios.get(url, 
                {
                    params:{
                        id: props.userId
                    }
                }
            ) 

            console.log(response)
            const reStatedExpiry = new Date(response.data.details.ExpiryDate)
            setCardDetails({
                ...response.data.details,
                CardNumber: hiddenCardNumber(response.data.details.CardNumber),
                ExpiryDate: reStatedExpiry,
                Cvv: hiddenCvvNumber()

            })

        } catch(error) {

        }
    }

    const hiddenCardNumber = (cardNumber) => {
        const last4 = cardNumber.slice(12)
        const hashedNumber = '************' + last4;
        return hashedNumber;
    }

    const hiddenCvvNumber = () => {
        const hashedCVV = '***'
        return hashedCVV;
    }

    return(
        <div className='w-[49%] border mb-4 rounded-lg'>
            <div className='bg-primary rounded-t-[6px] py-3'>
                <h2 className='ml-4 text-white font-bold'> Payment Detail </h2>
            </div>
            <div className='flex flex-row flex-wrap justify-between w-full px-5 my-5'>
                <div className='w-full flex gap-4 mb-2'>
                    <img src={MasterCard} className={`w-14 h-9 rounded-md object-cover ${cardType === 'Master' || cardDetails.CardType === 'MasterCard' ? 'border-2 border-green-500' : 'opacity-50'} `}/>
                    <img src={VisaCard} className={`w-14 h-9 rounded-md object-cover ${cardType === 'Visa' || cardType.CardType === 'VisaCard' ? 'border-2 border-green-500' : 'opacity-50'} `}/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="CardHolderName" className="block text-md font-medium text-gray-700">Name on Card</label>
                    <input onChange={setFields} type="text"  name='HolderName' disabled={cardDetails.NameOnCard ? true : false} defaultValue={cardDetails.NameOnCard} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="CardNumber" className="block text-md font-medium text-gray-700">Card Number</label>
                    <input onChange={setFields} type="text"  name='CardNumber' disabled={cardDetails.CardNumber ? true : false} defaultValue={cardDetails.CardNumber} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div className="w-[49%] mb-4">
                    <label htmlFor="CardExpiry" className="block text-md font-medium text-gray-700">Expiry Date</label>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker onChange={expirySet} name='Expiry' disabled={cardDetails.ExpiryDate ? true : false} value={cardDetails.ExpiryDate} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" format='MM/yyyy' views={['month', 'year']} />
                    </LocalizationProvider>
                </div> 
                <div className="w-[49%] mb-[28px]">
                    <label htmlFor="CardCvv" className="block text-md font-medium text-gray-700">CVV</label>
                    <input onChange={setFields} type="text" name='CVV' disabled={cardDetails.Cvv ? true : false} defaultValue={cardDetails.Cvv} maxLength={4} minLength={3} className="block w-full px-3 pb-2 pt-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"/>
                </div>
                <div className='mb-4'>
                    <button onClick={submitPaymentDetails} className='px-7 py-2 bg-primary rounded-lg text-white text-opacity-75 font-semibold hover:text-opacity-100 hover:font-bold transition-all duration-300 ease-linear' > Change Password </button>
                </div>
            </div>
        </div>
    )
}

export default PaymentDetailSection