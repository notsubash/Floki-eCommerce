import express from 'express'
import connectDB from './config/db.js'
import dotenv from 'dotenv'
import colors from 'colors'

import productRoutes from './routes/productRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.get('/', (req,res) => {
    res.send('API is running...')
})

app.use('/api/products', productRoutes)

const PORT = process.env.PORT || 5000
const MODE = process.env.NODE_ENV

app.listen(PORT, console.log(`Server running in ${MODE} mode on port ${PORT}`.magenta.bold))
