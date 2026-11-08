const itemModel = require('../models/itemModel')

function getAllListings(req, res){
    const items = itemModel.getAllListings()
    if(items == false) return res.send("No listings currently")
    res.json(items)
}

function addListing(req, res){
    const newListing = itemModel.createListing(req.body.name.trim())
    res.status(201).json(newListing)
}

function deleteListing(req, res){
    const id = parseInt(req.params.id)
    if(!id) return res.status(400).send("Id not given")
    const deletedListing = itemModel.deleteListing(id)
    if(deletedListing === null) return res.send("listing not found")
    res.json(deletedListing)
}

module.exports = {
    getAllListings,
    addListing,
    deleteListing
}