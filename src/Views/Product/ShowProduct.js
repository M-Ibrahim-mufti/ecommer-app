import axios from 'axios';
import {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCartCheckoutOutlined } from '@mui/icons-material'

const ShowProduct = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState({});   
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
            props.triggerNotification('success', response.data.message);
            setProduct(response.data.product)
        } catch(error) {
            props.triggerNotification('danger', error.response?.data?.message || error.message )
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

    return (
        <div className='w-full pt-20 flex items-center'>
            { product ? <div className='container flex gap-3 max-w-full mx-3'>
                <div className='w-1/2 flex flex-col gap-2'>
                    { product.Images && <div className='border-8 image-border-color rounded-2xl' style={{width:'100%', maxHeight:'470px',height:'100%', backgroundColor:'black' , background: `url(${product.Images[0]})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'contain'}} ></div>}
                    <div className='w-full flex gap-3 flex-row'>
                        { product.Images && product.Images.slice(1).map((images, index) => (
                            <div className='border-8 image-border-color rounded-2xl' key={`${product.Title} image ${index}`} style={{width:'112px', backgroundColor:'black' ,height:'96px' ,background:`url(${images})`, backgroundRepeat:'no-repeat', backgroundPosition: 'center',backgroundSize:'contain'}}></div>
                        ))}
                    </div> 
                </div>
                <div className='w-1/2 flex gap-3 flex-col'>
                    <div className='flex flex-row items-center gap-3 py-4 px-4 bg-secondary rounded-2xl'>
                        <h5 className='text-muted-dark font-bold w-3/4'> {product.Title}</h5>
                        <button className="group w-1/4 flex items-center justify-center py-3 button-bg rounded-xl transition-all duration-300 ease-linear">
                            <ShoppingCartCheckoutOutlined className="group-hover:text-opacity-100 text-white text-opacity-75 !w-5 !h-5"/>
                            <span className="group-hover:text-opacity-100 text-white text-opacity-75">Add to Cart</span>
                        </button>
                    </div>
                    <div className='flex flex-col bg-secondary px-4 py-4 rounded-2xl'>
                        <h5 className='text-muted-dark font-bold pb-4'>thes product is avalible in the sizes that are black</h5>
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
                            <h5 className='text-muted-dark font-bold pb-2'> Pricing per product </h5>
                            <div className='d-flex flex-col gap-4'>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-muted-dark w-1/2 font-bold mb-4'>Product in Stock</h5>
                                    <p className='text-muted font-semibold w-1/2'>: {product.Quantity} </p>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-muted-dark w-1/2 font-bold mb-4'>Price Per Product</h5>
                                    <p className='text-muted font-semibold w-1/2'>: {product.Price} PKR </p>
                                </div>
                            </div>
                        </div>
                        <div className='w-1/2 rounded-2xl bg-secondary py-2 px-4'>
                        <h5 className='text-muted-dark font-bold pb-2'> Pricing in Bulk  </h5>
                            <div className='d-flex flex-col gap-4'>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-muted-dark w-1/2 font-bold mb-4'>Bulk Qunitity</h5>
                                    <p className='text-muted font-semibold w-1/2'>: {product.Bulk?.Quantity}  </p>
                                </div>
                                <div className='flex flex-row gap-3'>
                                    <h5 className='text-muted-dark w-1/2 font-bold mb-4'>Price of bulk</h5>
                                    <p className='text-muted font-semibold w-1/2'>: {product.Bulk?.Price} PKR </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="py-4 max-h-[250px] bg-secondary  rounded-2xl h-full">
                        <h5 className='text-muted-dark px-4 font-bold pb-4' >Description</h5>
                        <p id='description-field' className='px-4 overflow-y-scroll customize-scroll-bar text-muted pb-4 '>
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
            
        </div>
    )
}

export default ShowProduct;


{/* <div style={{
    background:`url(${HeaderImage})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',   // Optional: adjust background size
    backgroundPosition: 'center', // Optional: adjust background position
    width: '100%', // Optional: set width
    height: '200px' // Optional: set height

    }}>

</div> */}