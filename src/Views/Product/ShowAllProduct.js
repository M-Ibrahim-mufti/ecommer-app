import axios from "axios"
import React, { useEffect, useState } from "react"
import '../../App.css'
import './Product.css'
import {ShoppingCartCheckoutOutlined} from "@mui/icons-material"
import { toggleCartDrawer } from "../../utils/utils"
const ShowAllProducts = () => {
    const [displayProduct, setDisplayProduct] = useState([])
    const [toggleCart, setToggleCart] = useState(false)

    useEffect(() => {
        getAllProducts();
    },[])

    const getAllProducts = async() => {
        try {
            const method = "/product/All-Products"
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.get(url)
            setDisplayProduct(response.data)
        }catch(Error) {
            console.log(Error)
        }
    }

    const toggleCartFuntionality = () => {
        setToggleCart(prevState => {
            const newState = !prevState;
            toggleCartDrawer(newState);
            return newState;
        })
    }

    return (
        <div className="pt-20">
            <div className="container max-w-full mx-auto">
                <div className="border-2 rounded-lg mx-3">
                    <div className="w-full flex flex-row items-center py-4 px-4 border-b-2">
                        <h2 className="w-1/2 text-2xl font-bold">Products</h2>
                        <div className="w-1/2 flex justify-end">
                            <button onClick={toggleCartFuntionality} className="group flex items-center gap-2 bg-primary py-3 px-6 button-bg rounded-xl transition-all duration-300 ease-linear">
                                <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5" />
                                <span className="group-hover:text-opacity-100 text-white text-opacity-75">Cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full py-4 px-4 border-b-2">

                    </div>
                    <div className="py-4 px-4 grid grid-cols-4 gap-8">
                        { displayProduct.map((product) => (
                            <div className="w-full border-2 rounded-xl relative">
                                <div className="bg-primary rounded-t-xl">
                                    <img className="w-full h-40 img-shadow object-contain" src={product.Images}/>
                                </div>
                                <div className="w-full flex justify-center relative bottom-5">
                                    <h2 className="py-2 px-5 rounded-xl text-black bg-white shadow-xl" >{product.Category}</h2>
                                </div>
                                <div className="-mt-3 mx-4 flex flex-col gap-3" >
                                    <h2 className="font-bold text-xl" >{product.Title}</h2>
                                    <h2 className="text-black text-opacity-75 pb-4">{product.Description}</h2>
                                </div>
                                <div className="mx-4 mb-4">
                                    <div className="w-full" >
                                        <button className="group w-full flex items-center justify-center py-2 button-bg rounded-xl transition-all duration-300 ease-linear">
                                            <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5"/>
                                            <span className="group-hover:text-opacity-100 text-white text-opacity-75">Add to Cart</span>
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

export default ShowAllProducts