const db = require('../models/index')
// immport the models
const UserModel = require('../models/User')
// use models by passing the connection and Sequelize
const User = UserModel(db.sequelize, db.Sequelize)

module.exports = {
  async register (req, res) {
    try {
      const user = await User.create(req.body)
      res.status(200).send({ message: 'Account created successfully' })
    } catch (error) {
      // email already exist
      res.status(400).send({ error: 'This email account is already in use' })
    }
  }
}