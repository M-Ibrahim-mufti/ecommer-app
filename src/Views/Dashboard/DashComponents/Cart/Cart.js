import { Close } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCart } from '../../../../slicer/CartSlicer';
import { removeFromProductCheckout, setTotalNumberOfProductCheckout } from '../../../../slicer/TotalCheckout';
import axios from 'axios';
import { setNotification } from '../../../../slicer/notificationSlicer';


const Cart = () => {
    const isCartOpen = useSelector(state => state.cart)
    const cartedProduct = useSelector(state => state.totalCheckoutProducts);
    
    const dispatch = useDispatch();

    const removeFromCheckout = async (product) => {
        try {
            const method = `/Cart/removeFromCart/${product._id}`
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.delete(url);
            if(response.status === 200) {
                dispatch(setNotification({type:'success', message:'successfully Removed From Cart'}))
                dispatch(setTotalNumberOfProductCheckout(response.data.totalNumberOfUserProductCarted))
                dispatch(removeFromProductCheckout(product))
            }
        } catch(error) {    
            dispatch(setNotification({type:'error', message:'Product Not Found'}))
        }
    }

    return (
        <div className={`${isCartOpen ? 'w-72 rounded-tl-lg rounded-bl-lg' : 'w-0'} fixed top-0 h-screen bg-[rgb(43,43,40)] z-50 right-0 transition-all duration-300 ease-linear`}>
            <div className='w-full flex justify-start items-center mx-1 my-1'>
                <button onClick={() => dispatch(setIsCart(!isCartOpen))} className='group cursor-pointer px-2 py-2 hover:bg-black hover:bg-opacity-20 rounded-lg transition-all duation-300 ease-linear'>
                    <Close className='group-hover:text-opacity-100 !w-10 !h-10 transition-all duration-300 ease-linear stroke-2 text-white text-opacity-50 font-bold' />
                </button>
            </div>
            <div className='mx-3 my-2 text-center'>
                <h5 className='bg-black bg-opacity-20 py-6 text-2xl font-bold text-white rounded-lg '>Your Cart</h5>
            </div>
            <div className='mx-3 my-2 flex flex-col gap-2'>
                {cartedProduct && cartedProduct.map((product,index) => (
                    <div key={"CartedProduct" + index} className='rounded-lg bg-black bg-opacity-20 w-full flex gap-x-2'>
                        <div
                            className='bg-black bg-opacity-20 rounded-tl-lg rounded-bl-lg'
                            style={{width:'95px', height:'95px', background:`url(${product.Images[0]}) no-repeat center/cover`}}
                        ></div>
                        <div className='flex flex-col flex-grow justify-center'>
                            <h5 className='text-white font-semibold'> {product.ProductName} </h5>
                            <p className='text-white text-opacity-50'>Quantity : {product.ProductQuantity}</p>
                            <p className='text-white text-opacity-75'>Price : {product.TotalPrice} </p>
                        </div>
                        <div className='flex items-center justify-end pr-3'>
                            <Close onClick={() => removeFromCheckout(product)} className='cursor-pointer text-white font-bold stroke-[4px]'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Cart;