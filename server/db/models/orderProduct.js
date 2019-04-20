const Sequelize = require('sequelize')
const db = require('../db')

const OrderProduct = db.define('order-product', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = OrderProduct
