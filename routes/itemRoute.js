const express = require('express')
const router = express.Router()

const itemController = require('../controllers/itemController')
const { validateListing } = require('../middlewares/validateListing')

router.get('/', itemController.getAllListings)
router.post('/', validateListing, itemController.addListing)
router.delete('/:id', itemController.deleteListing)

module.exports = router