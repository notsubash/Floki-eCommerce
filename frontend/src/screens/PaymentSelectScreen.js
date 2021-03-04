import React, { useState} from 'react'
import  { Form, Button , Col } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer from './FormContainer'
import { savePaymentMethod } from '../actions/cartActions.js'
import CheckoutPattern from '../components/CheckoutPattern'

const PaymentSelectScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if(!shippingAddress){
        history.push('/shipping')
    }

    const [paymentMethod, setPaymentMethod ] = useState('PayPal')
   

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <FormContainer>
            <CheckoutPattern step1 step2 step3 />
            <h2>Payment Method</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>
                        Select Payment Method
                    </Form.Label>
                

                <Col>
                    <Form.Check 
                        type='radio' 
                        label='PayPal or Credit Card' 
                        id='PayPal' name='paymentMethod' 
                        value='PayPal' 
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
                
            </Form>
        </FormContainer>
    )
}

export default PaymentSelectScreen
