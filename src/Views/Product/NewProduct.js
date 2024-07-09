import React, { useState, useEffect } from 'react';
import './Product.css';
import { AddOutlined } from '@mui/icons-material';
import axios from 'axios';

const NewProduct = () => {
    const [product, setProduct] = useState({
        Title:'',
        Description:'',
        Category: '',
        ClothingSizes: [],
        ShoeSizes: [],
        Images:[],
        Quantity:0,
        Price:0,
        Colors:'',
        Bulk:{
            Quantity:0,
            Price: 0
        },
        User:'',
    });

    useEffect(() => {
        if(product.Title !== '' && product.Description !== '' && product.Category !== '' && product.Quantity !== 0 && product.Price !== 0 && product.Images.length > 0) {
            if(product.Category === 'Clothing') {
                product.ShoeSizes = null
            } else if (product.Category === 'Footwear') {
                product.ClothingSizes = null
            }else {
                product.ShoeSizes = null
                product.ClothingSizes = null
            }
            setAddDisabled(false)
        }
    },[product])
    
    const [preview, setPreviews] = useState()
    const [addDisabled, setAddDisabled] = useState(true)

    const selectionBox = (event) => {
        const checkbox = event.target;
        if(checkbox.classList.contains('selection-color')){
            checkbox.classList.remove('selection-color');
        }else {
            checkbox.classList.add('selection-color');

        }
    }

    const selectImages = async (event) => {
        const files = event.currentTarget.files;
        const imagePreviews = [];

        Array.from(files).forEach((file) => {
            const reader = new FileReader()
            reader.onloadend = () => {
                imagePreviews.push({ url: reader.result })
                if(imagePreviews.length === files.length){
                    setPreviews(imagePreviews) 
                }  
            };
            reader.readAsDataURL(file)
        })

        const formData = new FormData();
        const imageList = Array.from(files);
        imageList.forEach((file) => { formData.append('image', file); })
        try{
            const method = '/product/Upload-Image'
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.post(url, formData)
            console.log(response);
            setProduct(prevProduct => ({
                ...prevProduct,
                Images: [...prevProduct.Images, ...response.data]
            }))
        } catch(error) {
            console.log('Error in the backend')
        }
    }

    const fillData = (el) => {
        setProduct(prevProduct => ({
            ...prevProduct,
            [el.target.name]: el.target.value
        }))
    }

    return (
        <div className='py-16'>
            <div className='container max-w-full mx-auto'>
                <div className='mt-4 mb-3 mx-4 py-3 border-2 rounded-2xl bg-white flex justify-between'>
                    <h5 className='font-extrabold text-2xl tracking-wide mx-4'>Add New Product</h5>
                    <button disabled={addDisabled} className={`py-2 px-5 bg-primary rounded-full mr-4 text-white ${addDisabled ? 'opacity-50' : ''}`}>Add Product</button>
                </div>
                <div className='flex flex-row mx-4 gap-4'>
                    <div className='w-2/3'>
                        <div className='bg-white border-2 rounded-2xl px-5 py-5 mb-3'>
                            <h2 className='mb-3 text-xl font-bold'>Add Product Info</h2>
                            <div className='flex flex-col gap-2 mb-3'>
                                <label className='font-bold'>Product Name</label>
                                <input onChange={fillData} name='Title' placeholder='Enter Product Title' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'></input>
                            </div>
                            <div className='flex flex-col gap-2 mb-3'>
                                <label className='font-bold'>Product Description</label>
                                <textarea onChange={fillData} name='Description' placeholder='Enter Detailed Description About Product' className='rounded-lg max-h-full resize-none h-28 shadow-inner py-2 px-4 bg-secondary w-full'></textarea>
                            </div>
                            <div className='flex flex-row gap-2 mb-3'>
                                {product.Category === "Clothing" ?
                                    (<div className='w-1/2 flex flex-col gap-2'>
                                        <div className='mb-2'>
                                            <label className='font-bold'> Select Available Sizes </label>
                                            <p className='text-muted'>Please Select the sizes that are available</p>
                                        </div>
                                        <ul className='flex flex-row gap-5'>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>XS</li>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>SM</li>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>MD</li>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>LG</li>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>XL</li>
                                            <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>XXL</li>
                                        </ul>
                                    </div>) : product.Category === 'Footwear' ? (
                                        <div className='w-1/2 flex flex-col gap-2'>
                                            <div className='mb-2'>
                                                <label className='font-bold'> Select Available Sizes </label>
                                                <p className='text-muted'>Please Select the sizes that are available</p>
                                            </div>
                                            <ul className='flex flex-row gap-5'>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>36</li>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>38</li>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>40</li>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>42</li>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>44</li>
                                                <li onClick={selectionBox} className='w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-secondary'>46</li>
                                            </ul>
                                        </div>
                                    ) : (product.Category === 'Home Appliance' || product.Category === 'Electronic') ? ( <div>

                                        </div>) : (<div className='bg-yellow-200 bg-opacity-50 py-2 px-5 w-full rounded-lg animate-pulse'> Kindly Select the Category to select Sizes </div>
                                    )
                                }
                                {product.Category ==="Clothing" || product.Category ==="Footwear" ? 
                                (<div className='w-1/2 flex flex-col gap-4'>
                                    <div className='mb-2'>
                                        <label className='font-bold'>Select Colors</label>
                                        <p className='text-muted'>Choose Color of your product</p>
                                    </div>
                                    <input name='Colors' type='text' placeholder='Enter Colors kindly seperate it with commas' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'/>
                                </div>) : (<div></div>)}
                            </div>
                        </div>
                        <div className='bg-white rounded-2xl border-2 px-5 py-5'>
                            <div className='flex flex-col flex-wrap gap-4 mx-4'>
                                <h5 className='font-bold text-xl'>Pricing & Quantity</h5>
                                <div className='flex flex-wrap gap-4'>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold'>Price per Item</label>
                                        <input name='Price' onChange={fillData} placeholder='Enter Per item price' type='text' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold'>Quantity</label>
                                        <input name='Quantity' onChange={fillData} placeholder='Enter Total Quantity of Product' type='text' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold'>Quantity in Bulk</label>
                                        <input name='Bulk.Quantity' onChange={fillData} placeholder='Enter Quantity in Bulk' type='text' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label htmlFor='BulkPrice' className='font-bold'>Price in Bulk</label>
                                        <input name='Bulk.Price' onChange={fillData} placeholder='Enter Price of Bulk' type='text' className='rounded-lg shadow-inner py-2 px-4 bg-secondary w-full'/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className='bg-white border-2 rounded-2xl px-5 py-5 mb-3'>
                            <h2 className='mb-3 text-xl font-bold'>Upload Images</h2>
                            <div className=''>
                                <input onChange={selectImages} type='file' id='productImage' multiple accept='image/*' hidden />
                                <div className='w-full mb-3 h-[300px] border-2 border-dotted rounded-lg flex items-center justify-center'>
                                    {preview && <img src={preview[0].url} className='w-full h-full object-contain bg-primary img-shadow' />}
                                </div>
                                <div className='flex flex-wrap gap-3'>
                                    {preview && (
                                        preview.map((image, index) => (
                                            <img key={`Product image ${index}`} src={image.url} className='bg-primary w-20 h-20 rounded-md border-2 border-dotted' />
                                        ))
                                    )}
                                    <label className='cursor-pointer flex items-center justify-center w-20 h-20 rounded-lg border-2 border-dotted' htmlFor='productImage'><AddOutlined className='text-muted' /></label>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white border-2 rounded-2xl px-5 py-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='w-full' >
                                    <label>Select Category</label>
                                    <select onChange={fillData} name='Category' className='px-4 w-full bg-secondary shawdow-inner py-4 rounded-lg'>
                                        <option disabled selected >Select Category</option>
                                        <option>Clothing</option>
                                        <option>Footwear</option>
                                        <option>Electronic</option>
                                        <option>Home Appliance</option>
                                    </select>
                                    <div className="my-3">
                                        {product.Category !== '' && <h2 className='rounded-lg w-full px-4 py-4 bg-secondary'>{product.Category}</h2>}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default NewProduct