const router = require('express').Router()
const {Category} = require('../db/models')
const {isAdmin} = require('../middleware/auth.middeware')
module.exports = router



router.get('/', isAdmin, async (req, res, next) => {

    try{
        const allCategories = await Category.findAll()
        res.json(allCategories)

     }catch(err){
         next(err)
     }

})

router.post('/add-category', isAdmin, async (req, res, next) => {

    try{
       const newCategory = await Category.create(req.body)
       res.json(newCategory)

    }catch(err){
        next(err)
    }
})

