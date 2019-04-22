const router = require('express').Router()
const {Product, Category, CategoryProduct} = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
module.exports = router

router.get('/all/:page', async (req, res, next) => {
  try {
    const categories = req.query.categories

    const page = req.params.page
    
    let pageSize = 10;

    let products;

    if (categories) {
      // format categories into array of objecs
      // as this is the structure sequel takes the options in
      const formattedCategories = categories.map(cat => {
        return {name: cat}
      })

      products = await Product.findAll({
        include: [
          {
            model: Category,
            where: {
              [Op.and]: formattedCategories
            }
          }
        ],
        where: {
          inventory: {
            [Op.gte]: 1
          }
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
      })
    } else {
      products = await Product.findAll({
        where: {
          inventory: {
            [Op.gte]: 1
          }
        },
        offset: pageSize * (page - 1),
        limit: pageSize,
      })
    }

    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

router.put('/:id/editproduct', isAdmin, async (req, res, next) => {
  try {
    console.log(req.params.id)
    const product = await Product.findByPk(req.params.id)

    const editedProdcut = await product.update(req.body)
    res.json(editedProdcut)
  } catch (error) {
    next(error)
  }
})

router.post('/:id/editproduct/addCategory', isAdmin, async (req, res, next) => {
  try{

   const category = await Category.findOne({
    where: {
      name: req.body.category
    }
  })
    const newCategory = await CategoryProduct.create({
      productId: req.params.id,
      categoryId: category.id
    })
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id/editproduct/removeCategory', isAdmin, async (req, res, next) => {
  try {

      const category = await Category.findOne({
        where: {
          name: req.body.category
        }
      })
      const removed = await CategoryProduct.destroy({
        where: {
          productId: req.params.id,
          categoryId: category.dataValues.id
        }
      })
      res.status(200).send('Successfully Removed!')
  } catch (err) {
    next (err)
  }
})

