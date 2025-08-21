const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Attach user to request (without password)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch (err) {
      return res.status(401).json({ error: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No token, not authorized' })
  }
}
