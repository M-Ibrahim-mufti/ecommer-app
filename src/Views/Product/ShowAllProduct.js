import axios from "axios"
import React, { useEffect, useState } from "react"
import '../../App.css'
import './Product.css'
import {SearchOutlined} from "@mui/icons-material"
import { Link } from "react-router-dom"
import { TextField, Select, MenuItem, FormControl } from "@mui/material"
import FeaturedProduct from "./Product-components/FeaturedProduct"

const ShowAllProducts = () => {
    const [displayProduct, setDisplayProduct] = useState([])
    const [filteration, setFilteration] = useState([]);
    const [toggleSearch, setToggleSearch] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('-1')
    const [selectedPriceRange, setSelectedPriceRange] = useState('-1')
    const [priceRange, setPriceRange] = useState({
        min:'',
        max:''
    }) 

    useEffect(() => {
        getAllProducts();
    },[])

    const getAllProducts = async() => {
        try {
            const method = "/product/All-Products"
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.get(url)
            setDisplayProduct(response.data)
            setFilteration(response.data)
        }catch(Error) {
            // props.triggerNotification('danger', "Undergoing maintenance please try again in few minutes");            
        }
    }

    const filterByCategory = (event) => {
        setFilteration(displayProduct);
        setSelectedCategory(event.target.value);
        setFilteration((prevproduct) => {
            const filterProduct = prevproduct.filter((product) => product.Category === event.target.value )
            return filterProduct
        })
    }

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        setPriceRange((prevRange) => ({
            ...prevRange,
            [name]: value,
        }));
    };
    
    useEffect(() => {
        if(priceRange.max == 0 && priceRange.min == 0){
            setFilteration(displayProduct)
            setSelectedPriceRange(`-1`)
        }


        if (priceRange.max > 0 && priceRange.min >= 0) {
            const filteredProducts = displayProduct.filter((product) => {
                return product.Price >= priceRange.min && product.Price <= priceRange.max;
            });
            setFilteration(filteredProducts);
            setSelectedPriceRange(`${priceRange.min} - ${priceRange.max}`)
        }
    }, [priceRange]);

    const handleSelectChange = (event) => {
        setSelectedPriceRange(event.target.value);
    };

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
        <div className="py-16">
            <div className="container px-3 mb-3 max-w-full mx-auto overflow-hidden">
                <FeaturedProduct/>
            </div>
            <div className=" container max-w-full mx-auto">
                <div className="bg-secondary rounded-lg mx-3">
                    <div className="w-full flex flex-row border-b items-center py-4 px-4">
                        <h2 className="w-1/2 text-2xl font-bold">Products</h2>
                    </div>
                    <div className="w-full py-4 flex justify-between px-4 border-b">
                        <div className="w-2/5 flex jusitfy-start">
                            <div onClick={() => setToggleSearch(!toggleSearch)} className={`cursor-pointer px-4 py-3 bg-white transition-all duraion-300 ease-linear ${toggleSearch ? 'rounded-l-lg' : 'rounded-lg'} `}>
                                <SearchOutlined  className="text-gray-700" />
                            </div>
                            <input type="search" onChange={filterProducts} className={`bg-white rounded-r-xl ${toggleSearch ? 'search-field-shadow px-4 py-3 w-full' : 'w-0' } transition-all duration-300 ease-linear`}/>
                        </div>
                        <div className="w-1/2 flex gap-3 justify-end">
                            <FormControl sx={{ minWidth:150}}>  
                                <Select onChange={filterByCategory} className="!rounded-2xl"  value={selectedCategory}>
                                    <MenuItem disabled value={'-1'}> Filter Category  </MenuItem>
                                    <MenuItem value={'Clothing'}> Clothing </MenuItem>
                                    <MenuItem value={'Footwear'}> Footwear </MenuItem>
                                    <MenuItem value={'Electronic'}> Electronics </MenuItem>
                                    <MenuItem value={'Home Appliance'}> Furniture </MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ minWidth: 200 }}>
                                <Select
                                    value={selectedPriceRange}
                                    className="!rounded-2xl"
                                    displayEmpty
                                    renderValue={() => selectedPriceRange === '-1' ? 'Filter By Price' : selectedPriceRange}
                                    onChange={handleSelectChange}
                                    MenuProps={{
                                        PaperProps: {
                                          sx: {
                                            width: '200px',
                                          },
                                        },
                                    }}
                                >
                                    <MenuItem disabled value={'-1'}>
                                    Filter By Price
                                    </MenuItem>
                                    <MenuItem value={'Price Filter'} >
                                        <div className="flex justify-between" onClick={(e) => e.stopPropagation()}>
                                            <TextField  className="w-[45%]" id="min-price" name="min" variant="outlined" value={priceRange.min} placeholder="min" size="small" onChange={handlePriceChange}/>
                                            <TextField  className="w-[45%]" id="max-price" name="max" variant="outlined" value={priceRange.max} placeholder="max" size="small" onChange={handlePriceChange} />
                                        </div>
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
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
                                <div id={`detail_product_${index}`} className="bg-primary second-content">
                                    <div 
                                        className="absolute top-1/2 left-1/2 w-[97%] h-[97%] brightness-[.35] -translate-x-1/2 -translate-y-1/2 rounded-xl"
                                        style={{background:`rgb(43,43,40) url(${product.Images[0]}) no-repeat center / cover`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'cover'}}
                                    ></div>
                                    <div className="absolute w-full text-gray-500 hidden">
                                        <div className="flex flex-col gap-2.5">
                                            <div className="max-h-16 flex items-center h-16">
                                                <h5 className="font-bold text-xl my-2 bg-white text-black px-3 mx-4 rounded-md"> {product.Title.split(' ').length < 3 ? product.Title : product.Title.split(' ').slice(0,3).join(' ') + '...' } </h5>
                                            </div>
                                            <div className="max-h-36 h-36">
                                                <p className="mx-5 font-normal text-sm text-justify text-white">
                                                    {product.Description.split(' ').length <= 40 ? product.Description : product.Description.split(' ').slice(0, 40).join(' ') + '...'} 
                                                </p>
                                            </div>
                                            <div className="max-h-16 flex items-center justify-end w-full h-16">
                                                <p className="text-right text-xl font-extrabold bg-white text-black px-3 my-2 mx-4 rounded-md">{product.Price}<span className="text-xs"> Rs</span></p>
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