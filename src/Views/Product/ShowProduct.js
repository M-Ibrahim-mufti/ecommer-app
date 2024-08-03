import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material'
import BasicModal from '../utils/Modal/Modal';

const ShowProduct = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});   
    const [purchasingModal,setPurchasingModal] = useState(false)
    const [toggleQuantitySelector, setToggleQuantitySelection] = useState(true)
    const [perUnitQuantity, setPerUnitQuantity] = useState([])
    const [bulkQuantity, setBulkQuantity] = useState([]);
    const [buyProduct, setBuyProduct] = useState({
        ProductName: '',
        PurchaseType:'',
        ProductQuantity:0,
        ProductSizes:[],
        TotalPrice:0
    })

    useEffect(() => {
        getPorductDetail();
        managingDescriptionBox();
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
            console.log(response)
            // props.triggerNotification('success', response.data.message);
            setProduct(response.data.product)
            const perUnitQuantities = Array.from({ length: response.data.product.Bulk.Quantity - 1 }, (_, i) => i + 1);
            const bulkQuantities = Array.from({ length: Math.floor(response.data.product.Quantity / response.data.product.Bulk.Quantity) }, (_, i) => (i + 1) * response.data.product.Bulk.Quantity);
    
            setPerUnitQuantity(perUnitQuantities);
            setBulkQuantity(bulkQuantities);


        } catch(error) {
            // props.triggerNotification('danger', error.response?.data?.message || error.message )
        }
    }
    
    if(!product) {
        return<div> Loading </div>
    }

    const managingDescriptionBox = () => {
        const descriptionParent = document.getElementById('description-field').parentElement;
        const descriptionSibling = descriptionParent.childNodes[0];
        const description = descriptionParent.childNodes[1];
        const finalHeight = descriptionParent.offsetHeight - descriptionSibling.offsetHeight - 20;
        descriptionSibling.classList.add(`py-[${500}px]`)
        description.style.maxHeight = `${finalHeight}px`
    }

    const handlePurchasingModalOpen = () => setPurchasingModal(true)
    const handlePurchasingModalClose = () => setPurchasingModal(false)

    const setSizes = (event) => {
        if(event.target.classList.contains('bg-primary')) {
            event.target.classList.remove('bg-primary', 'text-white');
            event.target.classList.add('bg-secondary', 'text-gray-700');
            const value = event.target.textContent.trim();
            const updateSizes = buyProduct.ProductSizes.filter((size) => !size.hasOwnProperty(value));
            setBuyProduct({...buyProduct, ProductSizes:updateSizes})

        } else {
            event.target.classList.remove('bg-secondary', 'text-gray-700');
            event.target.classList.add('bg-primary', 'text-white')
            const value = event.target.textContent.trim();
            const updatedSizes = [...buyProduct.ProductSizes, { [value]: 0 }];
            setBuyProduct({ ...buyProduct, ProductSizes: updatedSizes });
        }
    }

    const setQuantities = (event) => {
        if(event.target.name === 'perUnit') {
            buyProduct.PurchaseType = 'Per-Unit'
            const updatedQuantity = parseInt(event.target.value, 10);
            setBuyProduct({...buyProduct, ProductQuantity:updatedQuantity, TotalPrice:product.Price * updatedQuantity})
            console.log(buyProduct)
    
        } else if(event.target.name === 'bulk') {
            buyProduct.PurchaseType = 'Bulk'
            const updatedQuantity = parseInt(event.target.value, 10);
            setBuyProduct({...buyProduct, ProductQuantity:updatedQuantity, TotalPrice:product.Bulk?.Price * updatedQuantity })
            console.log(buyProduct)
        }
    }

    const setProductSizesQunatity = (event) => {
        const updateSizes = buyProduct.ProductSizes.map((size) => {
            if(Object.keys(size)[0] === event.target.name){
                return { [Object.keys(size)[0]]:parseInt(event.target.value, 10)}
            }
            return size;
        })
        setBuyProduct({...buyProduct, ProductSizes:updateSizes})
    }

    return (
        <div className='w-full pt-20 flex items-center'>
            { product ? <div className='container flex gap-3 max-w-full mx-3'>
                <div className='w-1/2 flex flex-col gap-2'>
                    { product.Images && <div className='border-8 image-border-color rounded-2xl' style={{width:'100%', maxHeight:'470px',height:'100%', background: `url(${product.Images[0]})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'contain'}} ></div>}
                    <div className='w-full flex gap-3 flex-row'>
                        { product.Images && product.Images.slice(1).map((images, index) => (
                            <div className='border-4 image-border-color rounded-2xl' key={`${product.Title} image ${index}`} style={{width:'112px' ,height:'96px' ,background:`url(${images})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'contain'}}></div>
                        ))}
                    </div> 
                </div>
                <div className='w-1/2 flex gap-3 flex-col'>
                    <div className='flex flex-row items-center gap-3 py-3 px-4 bg-secondary rounded-2xl'>
                        <h5 className='text-gray-500 font-bold w-3/4'> {product.Title}</h5>
                        <button  onClick={handlePurchasingModalOpen} className="group w-1/4 flex items-center justify-center gap-2 py-3 button-bg rounded-xl transition-all duration-300 ease-linear">
                            <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5"/>
                            <span className="group-hover:text-opacity-100 text-white text-opacity-75">Buy</span>
                        </button>
                    </div>
                    <div className='flex flex-col bg-secondary px-4 py-4 rounded-2xl'>
                        <h5 className='text-gray-500 font-bold pb-4'>thes product is avalible in the sizes that are black</h5>
                        { product.Category === 'Clothing' || product.Category === 'Footwear' ? <ul className='flex flex-row gap-5'>
                            <li className={`${product.ClothingSizes?.includes('XS') || product.ShoeSizes?.includes(36) ? 'bg-primary text-white' : 'bg-white'}  w-12 h-12 flex items-center justify-center rounded-md`}>{ product.Category === 'Clothing' ? 'XS' : product.Category === 'Footwear' ? '36' : ''  }</li>
                            <li className={`${product.ClothingSizes?.includes('SM') || product.ShoeSizes?.includes(38) ? 'bg-primary text-white' : 'bg-white'}  w-12 h-12 flex items-center justify-center rounded-md`}> { product.Category === 'Clothing' ? 'SM' : product.Category === 'Footwear' ? '38' : ''  } </li>
                            <li className={`${product.ClothingSizes?.includes('MD') || product.ShoeSizes?.includes(40) ? 'bg-primary text-white' : 'bg-white'}  w-12 h-12 flex items-center justify-center rounded-md`}> { product.Category === 'Clothing' ? 'MD' : product.Category === 'Footwear' ? '40' : ''  } </li>
                            <li className={`${product.ClothingSizes?.includes('LG') || product.ShoeSizes?.includes(42) ? 'bg-primary text-white' : 'bg-white'}  w-12 h-12 flex items-center justify-center rounded-md`}> { product.Category === 'Clothing' ? 'LG' : product.Category === 'Footwear' ? '42' : ''  } </li>
                            <li className={`${product.ClothingSizes?.includes('XL') || product.ShoeSizes?.includes(44) ? 'bg-primary text-white' : 'bg-white'}  w-12 h-12 flex items-center justify-center rounded-md`}> { product.Category === 'Clothing' ? 'XL' : product.Category === 'Footwear' ? '44' : ''  } </li>
                            <li className={`${product.ClothingSizes?.includes('XXL') || product.ShoeSizes?.includes(46) ? 'bg-primary text-white' : 'bg-white'} w-12 h-12 flex items-center justify-center rounded-md`}> { product.Category === 'Clothing' ? 'XXL' : product.Category === 'Footwear' ? '46' : ''  } </li>
                            {product.Category === 'Footwear' && <li className={`${product.ShoeSizes?.includes(48) ? 'bg-primary text-white' : 'bg-white' } w-12 h-12 flex items-center justify-center rounded-md`}>{ product.Category === 'Footwear' ? '48' : ''}</li>}
                        </ul> : null}
                    </div>
                    <div className='flex gap-5'>
                        <div className='w-1/2 rounded-2xl bg-secondary py-2 px-4'>
                            <h5 className='text-gray-500 font-bold pb-2'> Pricing per product </h5>
                            <div className='d-flex flex-col gap-4'>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-gray-500 w-1/2 font-bold mb-4'>Product in Stock</h5>
                                    <p className='text-gray-500 font-semibold w-1/2'>: {product.Quantity} </p>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-gray-500 w-1/2 font-bold mb-4'>Price Per Product</h5>
                                    <p className='text-gray-500 font-semibold w-1/2'>: {product.Price} PKR </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 rounded-2xl bg-secondary py-2 px-4'>
                        <h5 className='text-gray-500 font-bold pb-2'> Pricing in Bulk  </h5>
                            <div className='d-flex flex-col gap-4'>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-gray-500 w-1/2 font-bold mb-4'>Bulk Qunitity</h5>
                                    <p className='text-gray-500 font-semibold w-1/2'>: {product.Bulk?.Quantity}  </p>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-gray-500 w-1/2 font-bold mb-4'>Price of bulk</h5>
                                    <p className='text-gray-500 font-semibold w-1/2'>: {product.Bulk?.Price} PKR </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 max-h-[250px] bg-secondary rounded-2xl h-full">
                        <h5 className='text-gray-500 px-4 font-bold pb-4' >Description</h5>
                        <p id='description-field' className='px-4 overflow-y-scroll customize-scroll-bar text-gray-500 pb-4 '>
                            {product.Description}
                            This versatile shirt combines comfort and style effortlessly. Crafted from soft, breathable cotton, it ensures all-day wearability with a relaxed fit that drapes beautifully. 
                            The classic design features a crisp collar and a button-down front, making it perfect for both casual and semi-formal occasions.
                            Available in a range of vibrant colors, it easily pairs with jeans or chinos for a polished look. Whether dressing up or down, this shirt is a wardrobe essential that delivers both sophistication and ease.
                            The shirt boasts a tailored silhouette with carefully stitched details, adding a touch of elegance to your ensemble. Its lightweight fabric is perfect for layering or wearing solo, providing versatility throughout the seasons.
                            Additionally, the shirt is easy to care for, retaining its shape and color wash after wash. Whether dressing up for a business meeting or enjoying a weekend outing,
                            this shirt is a wardrobe essential that delivers both sophistication and ease, ensuring you always look and feel your best.
                        </p>
                    </div>
                </div>

            </div> : null}
            <BasicModal
                width={500}
                open={purchasingModal}
                handleClose={handlePurchasingModalClose}
                Header={
                    <div>
                        <h2 className='py-4 rounded-t-lg px-4 text-xl font-bold border-b pb-3 bg-primary pt-3 text-white'> Select Size and Quantity </h2>
                    </div>
                }
                Content={
                    <div className='px-4 py-4 flex flex-col gap-3'>
                        <div className='flex flex-col gap-2'>
                            <p>Select Quantity Type</p>
                            <div className='flex'>
                                <button onClick={() => {setToggleQuantitySelection(true); setBuyProduct({...buyProduct, TotalPrice:0})}} className={`${toggleQuantitySelector ? 'bg-secondary shadow-inner' : ''} rounded-l-lg py-2 w-1/2 hover:bg-secondary transition-all duration-300 ease-linear`}> Per Unit </button>
                                <button onClick={() => {setToggleQuantitySelection(false); setBuyProduct({...buyProduct, TotalPrice:0})}   } className={`${!toggleQuantitySelector ? 'bg-secondary shadow-inner' : ''} rounded-r-lg py-2 w-1/2 hover:bg-secondary transition-all duration-300 ease-linear`}> Bulk </button>
                            </div>
                        </div>
                        {toggleQuantitySelector ? <div className='flex flex-col gap-2'>
                            <label className="block text-md font-medium text-gray-700" > Select Quantity</label>
                            <select onChange={setQuantities} defaultValue={'-1'} name='perUnit' className='border rounded-lg'>
                                <option value={'-1'} disabled> Select Quantity </option>
                                {perUnitQuantity ? perUnitQuantity.map((number) => (
                                    <option key={`Unit Quanity ${number}`} value={`${number}`} > {number}</option>
                                )) : null}
                            </select>
                        </div> :
                        <div className='flex flex-col gap-2'>
                            <label className="block text-md font-medium text-gray-700"> Select Bulk Quantity </label>
                            <select onChange={setQuantities} defaultValue={'-1'} name='bulk' className='border rounded-lg'>
                                <option value={'-1'} disabled> Select Quantity in Bulk </option>
                                {bulkQuantity ? bulkQuantity.map((number,index) => (
                                    <option key={`Bulk Quanity ${number}`} value={`${index + 1}`} >{number}</option>
                                )) : null}
                            </select>
                        </div>}
                        { product.Category === 'Clothing' || product.Category === 'Footwear' ? <div className='flex flex-col gap-2'>
                            <label className='block text-md font-medium text-gray-700'> Select Size </label>
                            <ul className='flex flex-row gap-5'>
                                {product.Category === 'Clothing' && product.ClothingSizes?.map((size) => (
                                    <li key={`size ${size}`} onClick={setSizes} className={`w-12 h-12 flex items-center bg-secondary text-gray-700 cursor-pointer justify-center rounded-md`}> { size }</li>
                                ))}
                                {product.Category === 'Footwear' && product.ShoeSizes?.map((size) => (
                                    <li key={`size ${size}`} onClick={setSizes} className={`w-12 h-12 flex items-center bg-secondary text-gray-700 cursor-pointer justify-center rounded-md`}> { size }</li>
                                ))}
                            </ul>
                            <div className='flex flex-row flex-wrap justify-between w-full'>
                                { buyProduct && buyProduct.ProductSizes?.map((size) => (
                                    <div key={`select Quantity of size ${Object.keys(size)[0]}`} className='w-[48%] flex flex-col'>
                                        <label className="block text-md font-medium text-gray-700"> Quanitity of {Object.keys(size)[0]} </label>
                                        <input onChange={setProductSizesQunatity} name={`${Object.keys(size)[0]}`} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" type='number'/>
                                    </div>
                                ))}
                            </div>
                        </div> : null}
                        <div className='flex justify-between border rounded-lg'>
                            <label className='block w-1/2 px-4 py-3 text-md border-r font-medium text-gray-700' > Total Price </label>
                            <p className='block w-1/2 px-4 py-3 text-right text-md font-medium text-gray-700'>
                                {buyProduct.TotalPrice} Rs
                            </p>
                        </div>
                    </div>
                }
                Footer={
                    <div className='bg-white border-t flex py-2 justify-center rounded-b-lg w-full'>
                        <button className='w-[95%] hover:bg-[#520874] transition-all duration-300 ease-linear bg-primary rounded-lg text-white py-2'>Add to Cart</button>
                    </div>
                }
            />
        </div>
        
    )
}

export default ShowProduct;
