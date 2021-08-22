// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Categories, {
  foreignKey: 'category_id',
  onDelete: 'SET NULL'
});

// Categories have many Products ??
Category.hasMany(Product, {
  foreignKey: 'category_id'
});

// Products belongToMany Tags (through ProductTag)

Product.belongsToMany(Tags, {
  through: ProductTag,
  foreignKey: 'product_id'

})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'

})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
