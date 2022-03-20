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
  Tag.findOne({
    where: {
      id: req.params.id
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        as: 'products',
        attributes: [
          'id', 
          'product_name', 
          'price', 
          'stock',
        ]
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      id: req.body.id
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No Tag found with that id'})
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No Tag found with that id'})
      return;
    }
    res.json(dbTagData);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

module.exports = router;
