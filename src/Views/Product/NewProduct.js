import React, { useState, useEffect } from 'react';
import { AddOutlined, Close } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../../slicer/notificationSlicer'
import axios from 'axios';
import './Product.css';
import { useParams } from 'react-router-dom';

const NewProduct = (props) => {
    const currentUser = useSelector((state) => state.user);
    const dispatch = useDispatch()
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

    const [addDisabled, setAddDisabled] = useState(true)
    const { id } = useParams()

    useEffect(() => {
        if(id) {
            getDetailForEdit();
        } else {
            setProduct((product) => ({
                ...product,
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
            }))
        }
    },[id])

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

    const getDetailForEdit = async () =>{
        try{
            const method = '/product/Get-Product-Details'
            const url = process.env.REACT_APP_SERVER_URL + method
            const response = await axios.get(url, 
                {
                    params:{
                        id:id,
                        userId:currentUser.user_id
                    }
                }
            )
            setProduct(response.data.product);
            console.log(response)
            dispatch(setNotification({type:'success', message:"Data fetched Successfully"}))

        } catch(err) {
            dispatch(setNotification({type:'danger', message:"Failed to Fetch Data"}))
        }
    }

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

    const addProduct = async () => {
        try {
            if(product.Category === 'Clothing') {
                product.ClothingSizes = []
                product.ShoeSizes = null
                document.querySelectorAll('.selection-color').forEach((size) => {
                    product.ClothingSizes.push(size.textContent);  
                })
            }
            if (product.Category === 'Footwear') {
                product.ShoeSizes = []
                product.ClothingSizes = null
                document.querySelectorAll('.selection-color').forEach((size) => {
                    product.ShoeSizes.push(size.textContent)
                })
            }

            product.User = currentUser.user_id
            
            const method = '/product/Add-product';
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.post(url, product)
            dispatch(setNotification({type:'success', message: response.data.message }))

        }catch(error) {
            dispatch(setNotification({type:'danger', message:error.response?.data?.message || error.message}))
        }
    }

    const updateProduct = async() => {

        try {
            if  (product.Category === 'Clothing') {
                product.ClothingSizes = []
                product.ShoeSizes = null
                document.querySelectorAll('.selection-color').forEach((size) => {
                    product.ClothingSizes.push(size.textContent);  
                })
            }
            if  (product.Category === 'Footwear') {
                product.ShoeSizes = []
                product.ClothingSizes = null
                document.querySelectorAll('.selection-color').forEach((size) => {
                    product.ShoeSizes.push(size.textContent)
                })
            }
            const method = '/product/update-product'
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.post(url, product);
            console.log(response);
            dispatch(setNotification({type:'success', message:'Update Successfully'}))
        } catch(err) {
            dispatch(setNotification({type:'danger', message:'Failed to Update data'}))
        }
    }


    const fillData = (el) => {
        const { name, value } = el.target;
        if (name.startsWith('Bulk.')) {
            const field = name.split('.')[1];
            setProduct(prevProduct => ({
                ...prevProduct,
                Bulk: {
                    ...prevProduct.Bulk,
                    [field]: parseInt(value)
                }
            }));
        } else {
            setProduct(prevProduct => ({
                ...prevProduct,
                [name]: name === 'Quantity' || name === 'Price' ? parseInt(value) : value
            }));
        }
    };

    const removeImage = async (img) => {
        try {
            const method = '/product/delete-image';
            const url = process.env.REACT_APP_SERVER_URL + method;
            const response = await axios.post(url, {img})
            console.log(response);
            setProduct((product) => ({
                ...product,
                Images: product.Images.filter((image) => image !=img)
            }))
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='w-full pt-16 flex items-center justify-center'>
            <div className='container max-w-full mx-auto'>
                <div className='mt-4 mb-3 mx-4 py-3 rounded-2xl bg-secondary flex justify-between'>
                    <h5 className='font-extrabold text-2xl text-gray-500 tracking-wide mx-4'>Add New Product</h5>
                    {!id ? <button disabled={addDisabled} onClick={addProduct} className={`py-2 px-5 bg-primary rounded-lg mr-4 text-white ${addDisabled ? 'opacity-50' : ''}`}>Add Product</button>:
                    <button disabled={addDisabled} onClick={updateProduct} className={`py-2 px-5 bg-primary rounded-lg mr-4 text-white ${addDisabled ? 'opacity-50' : ''}`}>Update Product</button>}
                </div>
                <div className='flex flex-row mx-4 gap-4'>
                    <div className='w-2/3'>
                        <div className='bg-secondary rounded-2xl px-5 py-5 mb-3'>
                            <h2 className='mb-3 text-xl  text-gray-500 font-bold'>Add Product Info</h2>
                            <div className='flex flex-col gap-2 mb-3'>
                                <label className='font-bold text-gray-500 '>Product Name</label>
                                <input onChange={fillData} name='Title' value={product.Title ? product.Title : ''} placeholder='Enter Product Title' className='rounded-lg input-bg-color search-field-shadow py-2 px-4 bg-primary w-full'></input>
                            </div>
                            <div className='flex flex-col gap-2 mb-3'>
                                <label className='text-gray-500 font-bold'>Product Description</label>
                                <textarea onChange={fillData} name='Description' value={product.Description ? product.Description : ''} placeholder='Enter Detailed Description About Product' className='rounded-lg input-bg-color max-h-full resize-none h-28 search-field-shadow py-2 px-4 bg-white w-full'></textarea>
                            </div>
                            <div className='flex flex-row gap-2 mb-3'>
                                {product.Category === "Clothing" ?
                                    (<div className='w-1/2 flex flex-col gap-2'>
                                        <div className='mb-2'>
                                            <label className='font-bold text-gray-500'> Select Available Sizes </label>
                                            <p className='text-gray-500 text-opacity-75'>Please Select the sizes that are available</p>
                                        </div>
                                        <ul className='flex flex-row gap-5'>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('XS') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>XS</li>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('SM') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>SM</li>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('MD') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>MD</li>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('LG') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>LG</li>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('XL') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>XL</li>
                                            <li onClick={selectionBox} className={`${product.ClothingSizes.includes('XXL') ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md bg-white`}>XXL</li>
                                        </ul>
                                    </div>) : product.Category === 'Footwear' ? (
                                        <div className='w-1/2 flex flex-col gap-2'>
                                            <div className='mb-2'>
                                                <label className='font-bold text-gray-500'> Select Available Sizes </label>
                                                <p className='text-gray-500 text-opacity-75'>Please Select the sizes that are available</p>
                                            </div>
                                            <ul className='flex flex-row gap-5'>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(36) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>36</li>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(38) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>38</li>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(40) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>40</li>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(42) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>42</li>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(44) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>44</li>
                                                <li onClick={selectionBox} className={`${product.ShoeSizes.includes(46) ? 'selection-color' : 'bg-white text-black'} w-12 h-12 cursor-pointer flex items-center justify-center rounded-md`}>46</li>
                                            </ul>
                                        </div>
                                    ) : (product.Category === 'Home Appliance' || product.Category === 'Electronic') ? ( <div>

                                        </div>) : (<div className='bg-yellow-200 bg-opacity-50 py-2 px-5 w-full rounded-lg animate-pulse'> Kindly Select the Category to select Sizes </div>
                                    )
                                }
                                {product.Category ==="Clothing" || product.Category ==="Footwear" ? 
                                (<div className='w-1/2 flex flex-col gap-4'>
                                    <div className='mb-2'>
                                        <label className='font-bold text-gray-500'>Select Colors</label>
                                        <p className='text-gray-500 text-opacity-75'>Choose Color of your product</p>
                                    </div>
                                    <input name='Colors' onChange={fillData} type='text' value={product.Colors ? product.Colors : ''} placeholder='Enter Colors kindly seperate it with commas' className='rounded-lg search-field-shadow py-2 px-4 bg-white w-full'/>
                                </div>) : null}
                            </div>
                        </div>
                        <div className='bg-secondary rounded-2xl px-w py-5'>
                            <div className='flex flex-col flex-wrap gap-4 mx-4'>
                                <h5 className='font-bold text-xl text-gray-500 '>Pricing & Quantity</h5>
                                <div className='flex flex-wrap justify-between'>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold text-gray-500'>Quantity</label>
                                        <input name='Quantity' value={product.Quantity ? product.Quantity : ''} onChange={fillData} placeholder='Enter Total Quantity of Product' type='text' className='rounded-lg input-bg-color search-field-shadow py-2 px-4 bg-white w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold text-gray-500'>Price per Item</label>
                                        <input name='Price' value={product.Price ? product.Price : ''} onChange={fillData} placeholder='Enter Per item price' type='text' className='rounded-lg input-bg-color search-field-shadow py-2 px-4 bg-white w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label className='font-bold text-gray-500'>Quantity in Bulk</label>
                                        <input name='Bulk.Quantity' value={product.Bulk.Quantity ? product.Bulk.Quantity : ''} onChange={fillData} placeholder='Enter Quantity in Bulk' type='text' className='rounded-lg input-bg-color search-field-shadow py-2 px-4 bg-white w-full'/>
                                    </div>
                                    <div className='w-[49%] flex flex-col gap-2 mb-3'>
                                        <label htmlFor='BulkPrice' className='font-bold text-gray-500'>Price in Bulk</label>
                                        <input name='Bulk.Price' value={product.Bulk.Price ? product.Bulk.Price : ''} onChange={fillData} placeholder='Enter Price of Bulk' type='text' className='rounded-lg input-bg-color search-field-shadow py-2 px-4 bg-white w-full'/>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                    <div className='w-1/3'>
                        <div className='bg-secondary rounded-2xl px-5 py-5 mb-3'>
                            <h2 className='mb-3 text-xl font-bold text-gray-500'>Upload Images</h2>
                            <div className=''>
                                <input onChange={selectImages} type='file' id='productImage' multiple accept='image/*' hidden />
                                <div className='w-full mb-3 h-[300px] border border-dotted rounded-lg flex items-center justify-center'>
                                    {product.Images.length > 0 && <img src={product.Images[0]} className='w-full rounded-lg h-full object-cover bg-primary img-shadow' />}
                                </div>
                                <div className='flex flex-wrap gap-4'>
                                    {product.Images && (
                                        product.Images.map((image, index) => (
                                            <div className='relative'>
                                                <img key={`Product image ${index}`} src={image} className={`bg-primary w-20 h-20 rounded-md border border-dotted`} />
                                                <button onClick={() => removeImage(image)} className='absolute -top-3 -right-1'><Close className='!text-sm w-2 h-2 text-white bg-red-600 rounded-full'/></button>
                                            </div>
                                        ))
                                    )}
                                    <label className='cursor-pointer flex items-center justify-center w-20 h-20 rounded-lg border border-dotted' htmlFor='productImage'><AddOutlined className='text-muted' /></label>
                                </div>
                            </div>
                        </div>
                        <div className='bg-secondary rounded-2xl px-5 py-5'>
                            <div className='flex flex-col gap-2'>
                                <div className='w-full' >
                                    <label className="text-gray-500 font-bold">Select Category</label>
                                    <select onChange={fillData} value={product.Category} name='Category' className='px-4 mt-3 w-full input-bg-color shawdow-inner py-4 rounded-lg'>
                                        <option value='' disabled >Select Category</option>
                                        <option value='Clothing' >Clothing</option>
                                        <option value='Footwear' >Footwear</option>
                                        <option value='Electronic' >Electronic</option>
                                        <option value='Home Appliance' >Home Appliance</option>
                                    </select>
                                    <div className="my-3">
                                        {product.Category !== '' && <h2 className='rounded-lg w-full px-4 py-4 bg-white'>{product.Category}</h2>}
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