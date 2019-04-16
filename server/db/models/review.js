const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      max: 5,
      min: 1
    }
  },
  
  title: {
    type: Sequelize.STRING,
  },
  
  description: {
    type: Sequelize.TEXT
  }
  
})

module.exports = Review;
