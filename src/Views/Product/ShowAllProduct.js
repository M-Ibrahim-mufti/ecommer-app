import axios from "axios"
import React, { useEffect, useState } from "react"
import '../../App.css'
import './Product.css'
import {ShoppingCartCheckoutOutlined, FilterAltOutlined, FilterAltOffOutlined, SearchOutlined} from "@mui/icons-material"
import { toggleCartDrawer } from "../../utils/utils"
const ShowAllProducts = (props) => {
    const [displayProduct, setDisplayProduct] = useState([])
    const [filteration, setFilteration] = useState([]);
    const [toggleCart, setToggleCart] = useState(false)
    const [toggleSearch, setToggleSearch] = useState(false)

    useEffect(() => {
        getAllProducts();
    },[])

    const getAllProducts = async() => {
        try {
            const method = "/product/All-Products"
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.get(url)
            props.triggerNotification('success', "Data loaded Successfully from the database");
            setDisplayProduct(response.data)
            setFilteration(response.data)
        }catch(Error) {
            props.triggerNotification('danger', "Failed to load data from database");            
        }
    }

    const toggleCartFuntionality = () => {
        setToggleCart(prevState => {
            const newState = !prevState;
            toggleCartDrawer(newState);
            return newState;
        })
    }

    const filterProducts = (event) => {
        setFilteration(displayProduct);
        setFilteration((prevProduct) => {
            const filteredProducts = prevProduct.filter(product => {
                if (product.Title.toLowerCase().includes(event.target.value.toLowerCase()) || product.Description.toLowerCase().includes(event.target.value.toLowerCase())) {
                    return product;
                }
                else {
                    return;
                }
            })
            return filteredProducts;
        })
    }


    return (
        <div className="pt-20">
            <div className=" container max-w-full mx-auto">
                <div className="border bg-secondary rounded-lg mx-3">
                    <div className="w-full flex flex-row items-center py-4 px-4 border-b">
                        <h2 className="w-1/2 text-2xl font-bold">Products</h2>
                        <div className="w-1/2 flex justify-end">
                            <button onClick={toggleCartFuntionality} className="group flex items-center gap-2 bg-primary py-3 px-6 button-bg rounded-xl transition-all duration-300 ease-linear">
                                <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5" />
                                <span className="group-hover:text-opacity-100 text-white text-opacity-75">Cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full py-4 flex justify-start px-4 border-b">
                        <div onClick={() => setToggleSearch(!toggleSearch)} className={`cursor-pointer px-4 py-3 bg-primary transition-all duraion-300 ease-linear ${toggleSearch ? 'rounded-l-lg' : 'rounded-lg'} `}>
                            <SearchOutlined  className="text-muted-dark" />
                        </div>
                        <input type="search" onChange={filterProducts} className={`bg-white rounded-r-xl ${toggleSearch ? 'search-field-shadow px-4 py-3 w-1/2' : 'w-0' } transition-all duration-300 ease-linear`}/>
                    </div>
                    <div className="py-4 px-4 grid grid-cols-4 gap-8">
                        { filteration.map((product, index) => (
                            <div key={`product ${index +1 }`} className="w-full bg-white border rounded-xl relative">
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