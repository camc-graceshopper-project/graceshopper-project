const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  image: {
    type: Sequelize.STRING,
    defaultValue: 'http://schwieterts.com/wp-content/uploads/2016/07/Schwieterts-Candy-18-300x300.jpg'
  },
  inventory: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false
  }
  
})

module.exports = Product
