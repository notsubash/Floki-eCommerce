import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import {Carousel, Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { listTopRatedProducts } from '../actions/productActions'

const TopRatedCarousel = () => {
    const dispatch = useDispatch()

    const productsTopRated = useSelector(state => state.productsTopRated)
    const { loading, error, products } = productsTopRated

    useEffect(() => {
        dispatch(listTopRatedProducts())
    },[dispatch])

    return loading 
        ? <Loader /> 
        : error 
        ? <Message variant='danger'>{error}
        </Message> : (
            <Carousel pause='hover' className='bg-dark'>
                {products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel-caption'>
                                <h3>
                                    {product.name} (रू {product.price})
                                </h3>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
        )
}

export default TopRatedCarousel
