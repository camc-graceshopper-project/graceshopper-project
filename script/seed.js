/* eslint-disable complexity */
/* eslint-disable max-statements */
'use strict'

const db = require('../server/db')
const {
  User,
  Order,
  Review,
  Product,
  Category,
  OrderProduct,
  CategoryProduct,
  Cart
} = require('../server/db/models')
const Faker = require('faker')

let testVar = Faker.lorem.sentence();
console.log(testVar);

async function seed() {
  try {
    await db.sync({force: true})
    console.log('db synced!')

    let fakeUsers = [];
    fakeUsers.push({email: 'cody@email.com', password: '123', isAdmin: true});
    fakeUsers.push({email: 'murphy@email.com', password: '123', isAdmin: false})
    for (let i = 0; i < 98; i++) {
      let userObj = {};
      userObj.email = Faker.internet.email();
      userObj.password = Faker.internet.password();
      userObj.isAdmin = false;
      fakeUsers.push(userObj);
    }

    const users = await User.bulkCreate(fakeUsers);



    let fakeProducts = [];
    for (let i = 0; i < 50; i++) {
      let productObj = {};
      productObj.name = Faker.commerce.productName()
      productObj.description = Faker.lorem.paragraphs(2, '\n')
      productObj.price = Number(Faker.finance.amount(3.00, 15.00, 2));
      productObj.inventory = 0;
      productObj.photo = Faker.image.abstract()
      fakeProducts.push(productObj);
    }
    for (let i = 0; i < 1500; i++) {
      let productObj = {};
      productObj.name = Faker.commerce.productName()
      productObj.description = Faker.lorem.paragraphs(2, '\n')
      productObj.price = Number(Faker.finance.amount(3.00 ,15.00 ,2));
      productObj.inventory = Faker.random.number(20000)
      productObj.image = Faker.image.abstract()
      fakeProducts.push(productObj);
    }
    const products = await Product.bulkCreate(fakeProducts)

    // const products = await Promise.all([
    //   Product.create({
    //     name: 'Swedish Fish',
    //     description:
    //       'The most famous fish of all are the chewy Swedish Fish! Now the mini fish you love are available in Tropical flavors: Pina Colada, Tropical Island, Beachy Punch, and Passion Fruit. Original the Swedish Fish were made by Malaco, came to North America in the late 60s, and are now manufactured by Cadbury Adams. Each bag contains 8oz. 6 bags per order.',
    //     price: 13.25,
    //     inventory: 24000,
    //     photo:
    //       'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/t/r/tropical_swedish_fish_8oz_6ct.jpg'
    //   }),
    //   Product.create({
    //     name: 'Paris Gummy Eiffel Towers',
    //     description:
    //       'Say Bonjour to these little landmarks that bring big fruit flavor! If you’re planning a Persian party or just need a French fruit fix an Eiffel Tower gummy is the perfect way to satisfy!',
    //     price: 10.45,
    //     inventory: 0,
    //     image:
    //       'https://cdn.candynation.com/media/catalog/product/cache/c687aa7517cf01e65c009f6943c2b1e9/e/i/eiffel__44963.jpg'
    //   }),
    //   Product.create({
    //     name: 'Pulparindo De La Rosa Candy Bar',
    //     description:
    //       'From Mexico, Pulparindo, one of many forms of spicy, sour, salty sweets made from tamarind pulp and chili. This one resembles a miniature, individually wrapped fruit leather — though slightly thicker and less stretchy — with a satisfyingly gritty texture, and a serious kick of heat.',
    //     price: 6,
    //     inventory: 10,
    //     image:
    //       'https://pixel.nymag.com/imgs/daily/strategist/2017/03/08/Drugstore-Candy/Pulparindo.w600.h396.jpg'
    //   }),
    //   Product.create({
    //     name: 'Columbina Mini Fruit Filled Drops',
    //     description:
    //       'Colombina Fruit Filled Assorted Candies, Pack of 12, Total 396 Fruity Filled Candies from Colombia',
    //     price: 13.99,
    //     inventory: 20456,
    //     image:
    //       'https://images-na.ssl-images-amazon.com/images/I/71RRlB6srQL._SX522_.jpg'
    //   }),
    //   Product.create({
    //     name: 'Japanese Nestle Kit Kat (14 bars)',
    //     description:
    //       'Nestle Japan Kit Kat Chocolate Sakura Sake Flavor 14 bars.',
    //     price: 14.99,
    //     inventory: 15778,
    //     image:
    //       'https://images-na.ssl-images-amazon.com/images/I/A1EMqIfmQKL._SX522_.jpg'
    //   })
    // ])


    let fakeOrders = [];
    for (let i = 0; i < 500; i++) {
      let orderObj = {};
      orderObj.status = Faker.random.arrayElement(['Created', 'Processing', 'Cancelled', 'Completed'])
      orderObj.totalPrice = Faker.finance.amount(5.00 , 50.00, 2);
      orderObj.userId = Faker.random.number({min: 1, max: 100})
      orderObj.email = Faker.internet.email();
      fakeOrders.push(orderObj)
    }
    const orders = await Order.bulkCreate(fakeOrders);



    let fakeReviews = [];
    for (let i = 0; i < 850; i++) {
      let reviewObj = {};
      reviewObj.rating = Faker.random.number({min: 1, max: 5})
      reviewObj.title = Faker.lorem.sentence()
      reviewObj.description = Faker.lorem.paragraph()
      reviewObj.productId = Faker.random.number({min: 60, max: 1400})
      reviewObj.userId = Faker.random.number({min: 1, max: 100})
      fakeReviews.push(reviewObj);
    }
    const reviews = await Review.bulkCreate(fakeReviews);



    let categoryNames = ['Gummy', 'Sour', 'French', 'Italian', 'Canadian', 'Mexican', 'Spicy', 'Chocolate', 'Fruity', 'Fizzy', 'Chinese', 'Hard-Candies', 'German', 'Swedish', 'American', 'Russian', 'Argentinian']

    let fakeCategories = [];
    for (let i = 0; i < categoryNames.length; i++) {
      let categoryObj = {};
      categoryObj.name = categoryNames[i]
      fakeCategories.push(categoryObj);
    }
    const Categories = await Category.bulkCreate(fakeCategories);



    // must re-do this so theres no repeats.
    // i.e. there cant be an association between order 5 and product 20
    // two times. the same product wouldnt be listed in the same order two times
    // theyd just have the same association with a higher quantity instead.
    // or just ignore it for now and disable unique constraint on model somehow
    // when fix it, make i < like 3000, to ensure statistically that every
    // order likely has some products in it (or we'll have empty orders)
    let fakeOrderProducts = [];
    for (let i = 0; i < 30; i++) {
      let orderProductObj = {};
      orderProductObj.quantity = Faker.random.number({min: 1, max: 10})
      orderProductObj.price = Faker.finance.amount(5.00 , 15.00, 2);
      orderProductObj.orderId = Faker.random.number({min: 1, max: 500})
      orderProductObj.productId = Faker.random.number({min: 1, max: 1500})
      fakeOrderProducts.push(orderProductObj);
    }
    const order_products = await OrderProduct.bulkCreate(fakeOrderProducts);



    // this is a helper function for the seed below
    const doesAssocExist = function(arrOfAssoc, newAssoc) {
      let doesExist = false;
      let newItemKeys = Object.values(newAssoc);

      arrOfAssoc.forEach((item) => {
        let itemKeys = Object.values(item);
        let isEqual = itemKeys.every((key, idx) => {
          return (key === newItemKeys[idx])
        })
        if (isEqual) {
          doesExist = true;
        }
      })
      return doesExist;
    }

    let fakeCategoryProducts = [];
    let i = 1;
    while (i < 1550) {
      let categoryProductObj = {};
      categoryProductObj.productId = i
      categoryProductObj.categoryId = Faker.random.number({min: 1, max: categoryNames.length})

      if (!doesAssocExist(fakeCategoryProducts, categoryProductObj)) {
      fakeCategoryProducts.push(categoryProductObj);
      }

      let chanceToGoUpInProductId = Faker.random.number({min: 1, max: 100});
      if (chanceToGoUpInProductId > 60) {
        i++
      }
    }
    const category_products = await CategoryProduct.bulkCreate(fakeCategoryProducts);




    let fakeCarts = [];
    for (let i = 0; i < 250; i++) {
      let cartObj = {};
      cartObj.productId = Faker.random.number({min: 60, max: 1400})
      cartObj.userId = Faker.random.number({min: 1, max: 100})
      cartObj.quantity = Faker.random.number({min: 1, max: 15})

      if (!doesAssocExist(fakeCarts, cartObj)) {
        fakeCarts.push(cartObj);
      }
    }
    const carts = await Cart.bulkCreate(fakeCarts);

  } catch (err) {
    console.log(err)
  }
  // console.log(`seeded ${users.length} users`)
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
