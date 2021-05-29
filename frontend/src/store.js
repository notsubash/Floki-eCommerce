import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer, productRemoveReducer, productCreateReducer , productUpdateReducer, productCreateReviewReducer, productTopRatedReducer } from './reducers/productReducers.js'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer , userDetailsReducer , userUpdateProfileReducer, userListReducer, userRemoveReducer, userUpdateReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPaymentReducer, orderDeliverReducer ,orderMineReducer, orderListReducer  } from './reducers/orderReducers'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productRemove: productRemoveReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productCreateReview: productCreateReviewReducer,
    productsTopRated: productTopRatedReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    updateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer, 
    orderDetails: orderDetailsReducer,
    orderPayment: orderPaymentReducer,
    orderDeliver: orderDeliverReducer,
    orderMine : orderMineReducer,
    orderList: orderListReducer,
    userList : userListReducer,
    userRemove: userRemoveReducer,
    userUpdate: userUpdateReducer
})

const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : []

const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null

const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')) : {}


const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, 
    shippingAddress: shippingAddressFromLocalStorage},
    userLogin: { userInfo: userInfoFromLocalStorage }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store
