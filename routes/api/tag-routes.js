const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { associations, sequelize } = require('../../models/Product');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  console.log('===================');
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    // be sure to include its associated Product data
    include: [
      {
        model: Product,
        as: 'products',
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock',
          // [
          //   sequelize.literal('SELECT COUNT (*) FROM product_tag WHERE product_id = product_tag.product_id'), 'products'
          // ]
        ]
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
