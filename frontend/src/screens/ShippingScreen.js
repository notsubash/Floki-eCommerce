import React, { useState} from 'react'
import  { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector} from 'react-redux'
import FormContainer from './FormContainer'
import { saveShippingAddress } from '../actions/cartActions.js'
import CheckoutPattern from '../components/CheckoutPattern'

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [province, setProvince ] = useState(shippingAddress.province)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({address, city, postalCode, province}))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutPattern step1 step2 />
            <h2>Shipping</h2>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control type='text' placeholder='Enter your Address' value={address} required
                    onChange={(e) => setAddress(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='Enter your city' value={city} required
                    onChange={(e) => setCity(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='postalCode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Enter Postal Code' value={postalCode} required
                    onChange={(e) => setPostalCode(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group controlId='province'>
                    <Form.Label>Province</Form.Label> 
                    <Form.Control as='select' value={province} onChange={(e) => setProvince(e.target.value)}>
                        <option value='' defaultValue disabled>Select your Province</option>    
                        <option value='1'>1</option>    
                        <option value='2'>2</option>    
                        <option value='3'>3</option>    
                        <option value='4'>4</option>    
                        <option value='5'>5</option>    
                        <option value='6'>6</option>    
                        <option value='7'>7</option>    
                        
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Continue
                </Button>
                
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen
