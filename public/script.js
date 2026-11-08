const itemInput = document.getElementById('item')
const submitBtn = document.getElementById("submit")
const mainContainer = document.getElementById("listings-main")
const backendUrl = "http://localhost:3000/api/listing"

function createCard(data) {
    const newBox = document.createElement("div")
    newBox.innerHTML = 
        `<h3>${data.name}</h3>
        <p>Current Status: ${data.found ? 'Found' : 'Lost'}</p>
        <button class="delete-btn">Found IT!</button>`

    const deleteBtn = newBox.querySelector(".delete-btn")
    deleteBtn.addEventListener("click", async function() {
        try {
            const response = await fetch(`${backendUrl}/${data.id}`, {
                method: "DELETE"
            })

            if (response.ok) {
                newBox.remove()
            } else {
                alert("Server error: Could not delete the item")
            }
        } catch (error) {
                console.error("Network connection failed:", error)
        }
    })

    return newBox
}

async function loadListings() {
    try {
        const response = await fetch(backendUrl)
        if (response.ok) {
            const listings = await response.json()
            mainContainer.innerHTML = "" 
            listings.forEach(item => {
                const card = createCard(item)
                mainContainer.appendChild(card)
            })
        }
    } catch (error) {
        console.error("Failed to load items:", error)
    }
}

window.addEventListener("DOMContentLoaded", loadListings)

submitBtn.addEventListener("click", async function() {
    const itemName = itemInput.value
    if (itemName.trim() === "") {
        alert("Please enter an item name")
        return
    }
    try {
        const response = await fetch(backendUrl, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: itemName
            })
        })
        const data = await response.json()

        if (response.ok) {
            const card = createCard(data)
            mainContainer.appendChild(card)
            itemInput.value = ""
        } else {
            alert("Server error: Could not save the item")
        }
    }catch (error) {
        console.error("Network connection failed:", error)
    }
})