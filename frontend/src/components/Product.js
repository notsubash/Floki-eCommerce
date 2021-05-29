import React from 'react'
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import Rating from './Rating'

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='h4'>
                        <strong>
                            {product.name}
                        </strong>
                    </Card.Title>
                </Link>

                <Card.Text as='h6'>
                    <Rating value={product.rating} text={`from ${product.numReviews} reviews`} />
                </Card.Text>

                <Card.Text as='h4'>
                    <strong>रू {product.price}</strong>
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product
