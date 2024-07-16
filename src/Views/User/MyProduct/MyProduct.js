import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const MyProductList = () => {
    const [products, setProducts] = useState([])
    const { id } = useParams() 
    const getAllUserProduct = async () => {
        try{  
            const method = '/product/All-user-products';
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.get(url,
                {
                    params:{
                        id: id
                    }
                }
            )
            setProducts(response.data)
        } catch(err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getAllUserProduct();
    }, [])

    return (
        <div className="pt-20">
        <div className="container max-w-full mx-auto">
            <div className="border-2 rounded-lg mx-3">
                <div className="w-full flex flex-row items-center py-4 px-4 border-b-2">
                    <h2 className="w-1/2 text-2xl font-bold">My Products</h2>
                </div>
                <div className="w-full py-4 px-4 border-b-2">

                </div>
                <div className="py-4 px-4 grid grid-cols-4 gap-8">
                    { products.map((product) => (
                        <div className="w-full border-2 rounded-xl relative">
                            <div className="bg-primary rounded-t-xl">
                                <img className="w-full h-40 img-shadow object-cover rounded-t-lg" src={product.Images[0]}/>
                            </div>
                            <div className="w-full flex justify-center relative bottom-5">
                                <h2 className="py-2 px-5 rounded-xl text-black bg-white shadow-xl" >{product.Category}</h2>
                            </div>
                            <div className="-mt-3 mx-4 h-28 flex flex-col gap-2" >
                                <h2 className="font-bold text-xl" >{product.Title}</h2>
                                <h2 className="text-black text-opacity-75 pb-4">{product.Description.split(' ').length <= 12 ? product.Description : product.Description.split(' ').slice(0, 12).join(' ') + ' ...'}</h2>
                            </div>
                            <div className="mx-4 mb-4">
                                <div className="w-full" >
                                    <button className="group w-full flex items-center justify-center py-2 button-bg rounded-xl transition-all duration-300 ease-linear">
                                        <span className="group-hover:text-opacity-100 text-white text-opacity-75">See Product</span>
                                    </button>
                                </div>
                            </div>
                            <div className="absolute -top-3 -right-3 w-14 h-14 pricing-shadow flex items-center justify-center rounded-full bg-primary">
                                <h2 className="text-white text-xs">{product.Price + " Rs"}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
    )
}

export default MyProductList