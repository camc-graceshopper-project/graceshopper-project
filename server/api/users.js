const router = require('express').Router()
const {User, Review, Order} = require('../db/models')
const {isAdmin, isAdminOrIsUser} = require('../middleware/auth.middeware')
const Mailgun = require('mailgun-js')
module.exports = router

var api_key = 'f6db9e78db3473fe581560d3627f7792-3fb021d1-4dd33531'
var DOMAIN = 'sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN})

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })

    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id/orderhistory', isAdminOrIsUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {id: req.params.id},
      include: [Order]
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', isAdmin, (req, res, next) => {
  try {
    User.destroy({
      where: {
        id: req.params.userId
      }
    })
  } catch (err) {
    next(err)
  }
})

router.put('/makeAdmin', isAdmin, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    const makeUserAdmin = await user.update(
      {isAdmin: true},
      {
        where: {
          isAdmin: false
        }
      }
    )
    res.json(makeUserAdmin)
  } catch (err) {
    next(err)
  }
})

router.put('/reset/:token', isAdminOrIsUser, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        resetPasswordToken: req.params.token
      }
    })
    const updateUserPassword = await user.update({password: req.body.password})
    res.json(updateUserPassword)

    // let email = {
    //   from:
    //     'Mailgun Sandbox <postmaster@sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org>',
    //   to: `Christa Kaspo <christa.kaspo@gmail.com>`,
    //   subject: `Your password has been updated!`,
    //   text: `Hello ${req.user.email}, your password has been updated.`
    // }
    // mailgun.messages().send(email, function(error, body) {
    //   if (error) {
    //     console.log(error)
    //   }
    //   console.log(body)
    //   //res.json(updateUserPassword)
    // })
  } catch (error) {
    next(error)
  }
})
