import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import  { Row, Col, ListGroup, Image, Card } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getOrderDetails, paymentOrder } from '../actions/orderActions'
import { ORDER_PAYMENT_RESET } from '../constants/orderConstants'

const OrderScreen = ({match}) => {

    const orderID = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()


    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error} = orderDetails

    const orderPayment = useSelector(state => state.orderPayment)
    const { loading: loadingPayment, success: successPayment } = orderPayment

    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if(!order || order._id !== orderID || successPayment ){
            dispatch({ type: ORDER_PAYMENT_RESET })
            dispatch(getOrderDetails(orderID))
        } else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, order, orderID, successPayment])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(paymentOrder(orderID, paymentResult))
    }

    return loading ? <Loader /> 
    : error ? <Message variant='danger'>{error}</Message> 
    : <>
        <h2>Order {order._id}</h2>
        <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>Shipping</h3>
                            <p><strong>Name: </strong> {order.user.name}</p>
                            <p><strong>Mail: </strong><a href={`mailto: ${order.user.email}`}>{order.user.email}</a></p>
                            <p>
                                <strong>
                                    Address:
                                </strong>
                                {''} {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode},{' Province No: '}{order.shippingAddress.province}
                            </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on {order.deliveredAt}</Message>
                            : <Message variant='danger'>Not Delivered</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Payment Method</h3>
                            <p>
                                <strong>
                                Method:
                                </strong>
                                {''} {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>
                            : <Message variant='danger'>Not Paid</Message>
                            }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h3>Order Items</h3>
                            {order.orderItems.length === 0 ? (<Message>Your cart is empty!</Message>)
                            : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
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
                                                    {item.qty} x ${item.price} = ${item.price * item.qty}
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
                                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Shipping</Col>
                                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice.toFixed(2)}</Col>
                               </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                               <Row>
                                    <Col>Total Amount</Col>
                                    <Col>${order.totalPrice.toFixed(2)}</Col>
                               </Row>
                            </ListGroup.Item>
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPayment && <Loader />}
                                    {!sdkReady ? <Loader />
                                    : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                    )}
                                </ListGroup.Item>
                            )}
                         </ListGroup>               
                    </Card>
                </Col>
            </Row>
    </>
}

export default OrderScreen
