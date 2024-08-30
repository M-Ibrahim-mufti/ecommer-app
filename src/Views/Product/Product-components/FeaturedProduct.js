import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const FeaturedProduct = () => {

	const [currentSlide, setCurrentSlide] = useState(0);
	const [slides, setSlides] = useState([])
	const [info, setInfo] = useState(false);

	useEffect(() => {
		const slideInterval = setInterval(() => {
			handleNext();
		}, 5000);

		return () => clearInterval(slideInterval)
	},[slides])

	useEffect(() =>{
		getFeturedProduct()
	},[])


	const getFeturedProduct = async () => {
		try {
			const method = '/product/featured'
			const url = process.env.REACT_APP_SERVER_URL + method;
			const response = await axios.get(url)
			response.data.forEach(product => {
				setSlides((prevSlide) =>[...prevSlide, product]);
			})

		} catch(err) {
			console.log(err)
		}
	}

	const handlePrev = () => {
		setCurrentSlide((prevSlide) =>{
			if(prevSlide === 0) 
				return slides.length - 1 
			else
				return prevSlide - 1

		});
	};

	const handleNext = () => {
		setCurrentSlide((prevSlide) =>{
			if(prevSlide === slides.length - 1)
				return 0 
			else 
				return prevSlide + 1
		});
	};

	const goToSlide = (index) => {
		setCurrentSlide(index);
	};


	return (
		<div id="default-carousel" className="relative w-full">
			<div onMouseEnter={() => setInfo(true) } onMouseLeave={() => setInfo(false)} className="relative h-56 overflow-hidden rounded-lg md:h-[500px]">
				{slides.map((slide, index) => (
					<div key={index} className={`${info ? 'brightness-50' : ''} absolute inset-0 transition-opacity duration-700 ease-in-out ${ index === currentSlide ? "opacity-100" : "opacity-0" }`}>
						<img src={slide?.Images[0]} className="block w-full h-full bg-primary object-contain" alt={`Slide ${index + 1}`} />
					</div>
				))}
				{slides.map((slide,index) => ( 
					<div key={`Image text ${index}`}  className={`text-white absolute text-center -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 transition-opacity duration-700 ease-in-out ${info && index === currentSlide ? 'z-10 opacity-100' : 'opacity-0'}`}>
						<h5 className="text-3xl mb-1 text-center font-bold">{slide.Title}</h5>
						<p className="text-lg mb-3">{slide.Description.split(' ').length > 15 ? slide.Description.split(' ').slice(0, 15).join(' ') + '...' : slide.Description}</p>
						<Link to={`/product/${slide._id}`} className="inline-flex justify-center items-center w-24 h-8 rounded-md border border-white text-center hover:bg-white hover:text-black transition-colors duration-200 ease-linear">Buy Now</Link>
					</div>))}
			</div>
			<div className="absolute z-30 flex bottom-5 left-1/2 transform -translate-x-1/2 space-x-3 rtl:space-x-reverse">
				{slides.map((_, index) => (
					<button key={index} onClick={() => goToSlide(index)} className={`w-3 h-3 rounded-full ${ index === currentSlide ? "bg-blue-600" : "bg-gray-400" }`} aria-label={`Slide ${index + 1}`}/>
				))}
			</div>
			<button type="button" onClick={handlePrev} className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
				<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
					<svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1L1 5l4 4" />
					</svg>
					<span className="sr-only">Previous</span>
				</span>
			</button>
			<button type="button" onClick={handleNext} className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none">
				<span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
					<svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
						<path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 9l4-4-4-4" />
					</svg>
					<span className="sr-only">Next</span>
				</span>
			</button>
		</div>
	);
};

export default FeaturedProduct;
