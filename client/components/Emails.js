var mailgun = require('mailgun-js')
var api_key = 'f6db9e78db3473fe581560d3627f7792-3fb021d1-4dd33531'
var DOMAIN = 'sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org'
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN})

let email = {
  from:
    'Mailgun Sandbox <postmaster@sandbox51ac6892196a4c74839719aab3fc4eed.mailgun.org>',
  to: User.email,
  subject: `Order has been placed!`,
  text: `Hello ${User.name}, your order is being processed.`
}

mailgun.messages().send(email, function(error, body) {
  if (error) {
    console.log(error)
  }
  console.log(body)
})
