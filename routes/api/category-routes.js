const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
    include: {
      model: Product,
      attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
  })
  .then(dbCattData => {
    if (!dbCattData) {
      res.status(404).json({message: 'No Cats found'});
      return;
    }
    res.json(dbCattData);
  })
  
  // be sure to include its associated Products
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  });
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  
  Category.findOne({
    where: {
        id: req.params.id
    },
    include: {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
    }
})
// be sure to include its associated Products
.then(dbCattData => {
    if (!dbCattData) {
        res.status(404).json({ message: 'No categories found' });
        return;
    }
    res.json(dbCattData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err)
});
});

router.post('/', (req, res) => {
  // create a new category
  Category.create({
    category_name: req.body.category_name
})
.then(dbCattData => res.json(dbCattData))
.catch(err => {
    console.log(err);
    res.status(500).json(err);

});
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: {
        id: req.params.id
    }
})
.then(dbCattData => {
    if (!dbCattData) {
        res.status(404).json({ message: 'No category found with this id' });
        return;
    }
    res.json(dbCattData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
