let items = []
let nextId = 1

function createListing(name){
    if(items == false) nextId = 1
    const item = {
        id: nextId++,
        name: name,
        found: false
    }
    items.push(item)
    return item
}

function getAllListings(){
    return items
}

function getListingById(id){
    const item = items.find(item=>item.id === id)
    if(!item) return null
    return item
}

function deleteListing(id){
    const index = items.findIndex(item=> item.id === Number(id))
    if(index === -1) return null

    const deletedListing = items.splice(index, 1)
    return deletedListing[0]
}    

module.exports = {
    createListing,
    getAllListings,
    deleteListing
}