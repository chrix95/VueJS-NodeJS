const db = require('../models/index')
// immport the models
const UserModel = require('../models/User')
// use models by passing the connection and Sequelize
const User = UserModel(db.sequelize, db.Sequelize)
// import packages for password encryption and jwt
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user =  { name: req.body.name, email: req.body.email, password: hashedPassword }
      const createdUser = await User.create(user)
      const jwtToken = jwtSignUser(createdUser.toJSON())
      res.status(200).send({ 
        message: 'Account created successfully',
        user: createdUser.toJSON(),
        token: jwtToken
      })
    } catch (error) {
      // other error / email already exist
      res.status(400).send({ error: 'This email account is already in use' })
    }
  },
  async login (req, res) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({
        where: {
          email: email
        }
      })
      if (!user) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        res.status(403).send({
          error: 'The login information was incorrect'
        })
      }
      const userJSON = user.toJSON()
      res.status(200).send({ 
        message: 'Welcome back ' + user.name,
        user: userJSON,
        token: jwtSignUser(userJSON)
      })
    } catch (error) {
      // server error
      res.status(500).send({ 
        error: 'An error has occured trying to log in' 
      })
    }
  }
}