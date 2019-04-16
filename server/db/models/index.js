const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Review = require('./review')
const Order = require('./order')
const OrderProduct = require('./orderProduct')

Review.belongsTo(Product);
Product.hasMany(Review);

Review.belongsTo(User);
User.hasMany(Review);

Product.belongsToMany(Category, {through: 'category-product'});
Category.belongsToMany(Product, {through: 'category-product'});

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, {through: OrderProduct})
Product.belongsToMany(Order, {through: OrderProduct})


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Product,
  Category,
  Review,
  Order,
  OrderProduct
}
