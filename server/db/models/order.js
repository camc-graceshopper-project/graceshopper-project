const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  status: {
    type: Sequelize.STRING,
    defaultValue: 'Created',
    validate: {
      isIn: [['Created', 'Processing', 'Cancelled', 'Completed']]
    }
  },
  totalPrice: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
})

module.exports = Order;
