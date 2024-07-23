import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ShowProduct = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});   
    useEffect(() => {
        getPorductDetail();
    },[])
    
    const getPorductDetail = async () => {
        try {
            const method = '/product/Get-Product-Details';
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.get(url, {
                params:{
                    id:id
                }
            })
            props.triggerNotification('success', response.data.message);
            setProduct(response.data.product)
        } catch(error) {
            props.triggerNotification('danger', error.response?.data?.message || error.message )
        }
    }


    return (
        <div className='py-16'>
            <h5>Show Product page</h5>
        </div>
    )
}

export default ShowProduct;