import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import  { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import CheckoutPattern from '../components/CheckoutPattern'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({history}) => {

    const dispatch  = useDispatch()

    const cart = useSelector(state => state.cart)

    //calculating prices
    cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)

    cart.shippingPrice = (cart.itemsPrice > 100 ? 0 : 100).toFixed(2)

    cart.taxPrice = Number(( 0.13 * cart.itemsPrice)).toFixed(2)

    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { order, success, error} = orderCreate

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    

    return (
        <>
            <CheckoutPattern step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p>
                                <strong>
                                    Address:
                                </strong>
                                {''} {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode},{' Province No: '}{cart.shippingAddress.province}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <strong>
                                Method:
                            </strong>
                            {''} {cart.paymentMethod}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {cart.cartItems.length === 0 ? (<Message>Your cart is empty!</Message>)
                            : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name}
                                                    fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x Rs. {item.price} = Rs. {item.price * item.qty}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md = {4}>
                    <Card>
                         <ListGroup variant='flush'>
                            <ListGroup.Item>
                               <h2>Order Summary</h2> 
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Items</Col>
                                    <Col>Rs. {cart.itemsPrice}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Shipping</Col>
                                    <Col>Rs. {cart.shippingPrice}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Tax</Col>
                                    <Col>Rs. {cart.taxPrice}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Total Amount</Col>
                                    <Col>Rs. {cart.totalPrice}</Col>
                               </Row>
                            </ListGroup.Item>
                                <ListGroup.Item>
                                        {error && <Message variant='danger'>{error}</Message>}
                                </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type='button' 
                                    className='btn-block' 
                                    disabled={cart.cartItems.length === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>

                         </ListGroup>               
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
