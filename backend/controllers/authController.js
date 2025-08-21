const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
}

// @desc Register user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ message: 'User already exists' })

    const user = await User.create({ username, email, password })
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @desc Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      })
    } else {
      res.status(401).json({ message: 'Invalid credentials' })
    }
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
