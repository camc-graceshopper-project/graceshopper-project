const router = require('express').Router()
const { Category } = require('../db/models')
const { isAdmin } = require('../middleware/auth.middeware')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router


router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.post('/add-category', isAdmin, async (req, res, next) => {
  
  try {
    const newCategory = await Category.create(req.body)
    res.json(newCategory)
    
  } catch (err) {
    next(err)
  }
})


