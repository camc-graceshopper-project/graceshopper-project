'use strict'

const db = require('../server/db')
const {User, Order, Review, Product, Category, OrderProduct} = require('../server/db/models')

async function seed() {
  try{
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123', googleId: 'XYZ1234'}),
    User.create({email: 'murphy@email.com', password: '123', googleId: 'QWE567'}),
    User.create({email: 'meng@email.com', password: '123', googleId: 'SGH964'}),
    User.create({email: 'murphy@email.com', password: '123', googleId: 'RTY002'}),
    User.create({email: 'murphy@email.com', password: '123', googleId: 'HKS233'})
  ])

  const orders = await Promise.all([
    Order.create({status: 'Created', total_price: 14.99 }),
    Order.create({status: 'Processing', total_price: 14.99 }),
    Order.create({status: 'Cancelled', total_price: 14.99 }),
    Order.create({status: 'Completed', total_price: 14.99 }),
    Order.create({status: 'Created', total_price: 14.99 })
  ])

  const reviews = await Promise.all([
    Review.create({title: 'Great product!', text: 'The Swedish fish were fresh and they shipped well even in the extreme heat we were having.'}),
    Review.create({title: 'Favorite Candy!!', text: 'My favorite candy of all time and I have so much of it! Not sure how long it will last though.'}),
    Review.create({title: 'Big Surprise', text: 'A friend of mine loves this candy. I bought this huge bag of them and placed it in a large tin for Christmas. They loved it!'}),
    Review.create({title: 'Good Quality!', text: 'Quick delivery. Great price. Soft and chewy. Didn’t last long in our house!'}),
    Review.create({title: '100% Satisfied', text: 'At first I was very skeptical buying food off here, but it tasted completely fresh'})
  ])

  const products = await Promise.all([
    Product.create({title: 'Swedish Fish', description: 'The most famous fish of all are the chewy Swedish Fish! Now the mini fish you love are available in Tropical flavors: Pina Colada, Tropical Island, Beachy Punch, and Passion Fruit. Original the Swedish Fish were made by Malaco, came to North America in the late 60s, and are now manufactured by Cadbury Adams. Each bag contains 8oz. 6 bags per order.', price: 13.25, inventory: 24000, photo: 'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/t/r/tropical_swedish_fish_8oz_6ct.jpg'},),
    Product.create({title: 'Paris Gummy Eiffel Towers', description: 'Say Bonjour to these little landmarks that bring big fruit flavor! If you’re planning a Persian party or just need a French fruit fix an Eiffel Tower gummy is the perfect way to satisfy!', price: 10.45, inventory: 34000, image: 'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/e/i/eiffel__44963.jpg'}),
    Product.create({title: 'Pulparindo De La Rosa Candy Bar', description: 'From Mexico, Pulparindo, one of many forms of spicy, sour, salty sweets made from tamarind pulp and chili. This one resembles a miniature, individually wrapped fruit leather — though slightly thicker and less stretchy — with a satisfyingly gritty texture, and a serious kick of heat.', price: 6, inventory: 10, image: 'https://pixel.nymag.com/imgs/daily/strategist/2017/03/08/Drugstore-Candy/Pulparindo.w600.h396.jpg' }),
    Product.create({title: 'Columbina Mini Fruit Filled Drops', description: 'Colombina Fruit Filled Assorted Candies, Pack of 12, Total 396 Fruity Filled Candies from Colombia', price: 13.99, inventory: 20456, image: 'https://images-na.ssl-images-amazon.com/images/I/71RRlB6srQL._SX522_.jpg'}),
    Product.create({title: 'Japanese Nestle Kit Kat (14 bars)', description: 'Nestle Japan Kit Kat Chocolate Sakura Sake Flavor 14 bars.', price: 14.99, inventory: 15778, image: 'https://images-na.ssl-images-amazon.com/images/I/A1EMqIfmQKL._SX522_.jpg' })
  ])

  const categories = await Promise.all([
    Category.create({name: 'Country'}),
    Category.create({name: 'Soft'}),
    Category.create({name: 'Hard'}),
    Category.create({name: 'Sweet'}),
    Category.create({name: 'Sour'})
  ])

  const order_products = await Promise.all([
    OrderProduct.create({quantity: 1, price: 6.00}),
    OrderProduct.create({quantity: 2, price: 10.45}),
    OrderProduct.create({quantity: 3, price: 14.99}),
    OrderProduct.create({quantity: 1, price: 13.99}),
    OrderProduct.create({quantity: 1, price: 13.25})
  ])

} catch (err) {
  console.log(err)
}
  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
