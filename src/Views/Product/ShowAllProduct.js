import axios from "axios"
import React, { useEffect, useState } from "react"
import '../../App.css'
import './Product.css'
import {ShoppingCartCheckoutOutlined, SearchOutlined} from "@mui/icons-material"
import { toggleCartDrawer } from "../../utils/utils"
import { Link } from "react-router-dom"
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
            // props.triggerNotification('success', "Data loaded Successfully from the database");
            setDisplayProduct(response.data)
            setFilteration(response.data)
        }catch(Error) {
            // props.triggerNotification('danger', "Failed to load data from database");            
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

    const setProductVisibility = (capture, index) => {
        const DetailCont = document.querySelector(`#detail_product_${index}`).childNodes[1]
        if(capture === 'IN'){
            DetailCont.classList.remove('hidden')
        }
        if(capture === 'OUT') {
            DetailCont.classList.add('hidden')
        }
    }

    return (
        <div className="py-20">
            <div className=" container max-w-full mx-auto">
                <div className="bg-secondary rounded-lg mx-3">
                    <div className="w-full flex flex-row border-b items-center py-4 px-4">
                        <h2 className="w-1/2 text-2xl font-bold">Products</h2>
                        <div className="w-1/2 flex justify-end">
                            <button onClick={toggleCartFuntionality} className="group flex items-center gap-2 bg-primary py-3 px-6 button-bg rounded-xl transition-all duration-300 ease-linear">
                                <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5" />
                                <span className="group-hover:text-opacity-100 text-white text-opacity-75">Cart</span>
                            </button>
                        </div>
                    </div>
                    <div className="w-full py-4 flex justify-start px-4 border-b">
                        <div onClick={() => setToggleSearch(!toggleSearch)} className={`cursor-pointer px-4 py-3 bg-white transition-all duraion-300 ease-linear ${toggleSearch ? 'rounded-l-lg' : 'rounded-lg'} `}>
                            <SearchOutlined  className="text-gray-700" />
                        </div>
                        <input type="search" onChange={filterProducts} className={`bg-white rounded-r-xl ${toggleSearch ? 'search-field-shadow px-4 py-3 w-1/2' : 'w-0' } transition-all duration-300 ease-linear`}/>
                    </div>
                    <div className="py-4 px-4 grid grid-cols-4 gap-8">
                        { filteration.map((product, index) => ( 
                            <Link to={`/product/${product._id}`} key={`${product.Title + index}`} className="card !border-4 image-border-color" onMouseEnter={() => setProductVisibility('IN', index)} onMouseLeave={() => setProductVisibility('OUT', index)}>
                                <div className="first-content">
                                    <div 
                                        className="w-full h-full rounded-md"
                                        style={{background:`rgb(43,43,40) url(${product.Images[0]}) no-repeat center / cover`}}
                                    ></div>
                                </div>
                                <div id={`detail_product_${index}`} className="second-content">
                                    <div 
                                        className="absolute top-1/2 left-1/2 w-[97%] h-[97%] blur-sm brightness-50 -translate-x-1/2 -translate-y-1/2 rounded-md"
                                        style={{background:`rgb(43,43,40) url(${product.Images[0]}) no-repeat center / cover`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'cover'}}
                                    ></div>
                                    <div className="absolute text-gray-500 hidden">
                                        <div className="flex flex-col gap-2">
                                            <div className="max-h-14 flex items-center h-14">
                                                <h5 className="text-white font-bold text-xl my-3 mx-5"> {product.Title} </h5>
                                            </div>
                                            <div className="max-h-28 h-28">
                                                <p className="mx-5 font-normal text-base text-white"> {product.Description.split(' ').length <= 25 ? product.Description : product.Description.split(' ').slice(0, 25).join(' ') + '...'} </p>
                                            </div>
                                            <div className="max-h-14 flex items-center justify-end h-14">
                                                <p className="text-right text-xl font-normal text-white my-3 mx-5">Price : {product.Price}Rs</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowAllProducts