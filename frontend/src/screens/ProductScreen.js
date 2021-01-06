import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'
import axios from 'axios'

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState([])

    useEffect(() => {
        const fetchProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`)

            setProduct(data)
        }

        fetchProduct()
    }, [match])

    return (
        <>
            <Link className='btn btn-primary my-3' to='/'>
                Back to Homepage
            </Link>
            <Row>
                <Col md={6} >
                    <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3><strong>{product.name}</strong></h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={`${product.numReviews} reviews`} 
                            />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Price:</strong> ${product.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <strong>Description:</strong> {product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'> 
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong>Price:</strong>
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        <strong><i class="fas fa-warehouse"></i></strong>
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    className='btn-lg btn-info btn-block' 
                                    type='button' 
                                    disabled={product.countInStock === 0}
                                    >
                                    <i class="fas fa-shopping-cart"></i>
                                    <strong> Add To Cart</strong>
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
