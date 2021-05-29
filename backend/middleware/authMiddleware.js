import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressAsyncHandler from 'express-async-handler'

const protect = expressAsyncHandler( async (req, res, next ) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    {
        try {
            token  = req.headers.authorization.split(' ')[1]

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

            req.user = await User.findById(decoded.id).select('-password')

            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not Authorized, no token found')
    }

})

const administrator = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
        
    } else {
        res.status(401)
        throw new Error('Not authorized as an administrator!')
    }
}

export { protect, administrator }