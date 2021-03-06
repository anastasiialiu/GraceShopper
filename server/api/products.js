const router = require('express').Router()
const {Product} = require('../db/models')
const Sequelize = require('sequelize')
module.exports = router

const adminsOnly = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    const err = new Error('Not allowed!')
    err.status = 401
    return next(err)
  }
  next()
}

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product)
  } catch (err) {
    next(err)
  }
})

// router.get('/cart', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       where: {
//         id: {
//           [Sequelize.Op.in]: req.body.IDs
//         }
//       }
//     })
//     res.json(products)
//   } catch (err) {
//     next(err)
//   }
// })
