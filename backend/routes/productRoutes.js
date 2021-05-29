import express from 'express'
const router = express.Router()

import {getProducts, getProductById, removeProduct, updateProduct, createProduct, createProductReview , getTopProducts} from '../controllers/productController.js'
import { protect, administrator } from '../middleware/authMiddleware.js'


router.route('/').get(getProducts).post(protect,administrator,createProduct)
router.route('/:id/reviews').post(protect, createProductReview)
router.get('/toprated', getTopProducts)

router.route('/:id')
    .get(getProductById)
    .delete(protect, administrator, removeProduct)
    .put(protect,administrator,updateProduct)

export default router