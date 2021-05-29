import axios from 'axios'
import {ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAILURE, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAILURE, ORDER_PAYMENT_REQUEST, ORDER_PAYMENT_SUCCESS, ORDER_PAYMENT_FAILURE, ORDER_MINE_REQUEST, ORDER_MINE_SUCCESS, ORDER_MINE_FAILURE, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAILURE, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAILURE } from '../constants/orderConstants'

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.post(`/api/orders`,order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_CREATE_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_DETAILS_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const paymentOrder = (orderID, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAYMENT_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${orderID}/payment`, paymentResult,config)

        dispatch({
            type: ORDER_PAYMENT_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_PAYMENT_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const deliverOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DELIVER_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/orders/${order._id}/deliver`, {},config)

        dispatch({
            type: ORDER_DELIVER_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_DELIVER_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getPersonalOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_MINE_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myorders`,config)

        dispatch({
            type: ORDER_MINE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_MINE_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const listOrders = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders`,config)

        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({ 
            type: ORDER_LIST_FAILURE,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}