let restaurantsData;

fetch('http://localhost:3000/restaurants')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        restaurantsData = data;
        renderRestaurants(data);
    })
    .catch(error => console.error('Error:', error));

function renderRestaurants(restaurants) {
    const cardsContainer = document.querySelector('.cards');

    if (cardsContainer) {
        cardsContainer.innerHTML = '';
    
        cardsContainer.innerHTML = `
            <table class="restaurant-table">
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th class="cuisine">Cuisine</th>
                        <th>Rating</th>
                        <th>Details</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        `;
    
        const tbody = document.querySelector('tbody');
    
        for (let i = 0; i < restaurants.length; i++) {
            const restaurant = restaurants[i];
    
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${restaurant.picture}" alt="${restaurant.name}" /></td>
                <td>${restaurant.name}</td>
                <td>${restaurant.cuisine_nature}</td>
                <td>⭐ ${restaurant.rating}</td>
                <td><span class="details-card" onclick="showDetails(${restaurant.id})">Show Details</span></td>
                <td class="btns">
                    <button class="delete" data-name="${restaurant.name}">Delete</button>
                    <a href="./views/_update.html"><button class="update">Update</button></a>
                </td>
            `;
    
            tbody.appendChild(row);
    
            localStorage.setItem(`restaurant_${restaurant.id}`, JSON.stringify(restaurant));
        }
    };
    // Attach event listeners to delete buttons
    const deleteButton = document.querySelectorAll(".delete");
    deleteButton.forEach(button => {
        button.addEventListener("click", function () {
            const restaurantName = button.getAttribute("data-name");
            deleteRestaurant(restaurantName);
        });
    });
}

function showDetails(id) {
    const restaurant = JSON.parse(localStorage.getItem(`restaurant_${id}`));
    const cardsContainer = document.querySelector('.cards-details');

    if (cardsContainer) {
        cardsContainer.innerHTML = '';
    }

    if (restaurant) {
        window.location.href = "./restaurant.html?card="+encodeURIComponent(JSON.stringify(restaurant));
    }
}

function searchRestaurant(value) {
    const cardsContainer = document.querySelector('.cards');
    cardsContainer.innerHTML = '';

    cardsContainer.innerHTML = `
        <table class="restaurant-table">
            <thead>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th class="cuisine">Cuisine</th>
                    <th>Rating</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody></tbody>
        </table>
    `;

    const tbody = document.querySelector('tbody');

    if (value.trim() === '') {
        renderRestaurants(restaurantsData);
    }
    else {
        for (let i = 0; i < restaurantsData.length; i++) {
            if (restaurantsData[i].name.toLowerCase().includes(value.toLowerCase())) {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${restaurantsData[i].picture}" alt="${restaurantsData[i].name}" /></td>
                    <td>${restaurantsData[i].name}</td>
                    <td>${restaurantsData[i].cuisine_nature}</td>
                    <td>⭐ ${restaurantsData[i].rating}</td>
                    <td><span class="details-card" onclick="showDetails(${restaurantsData[i].id})">Show Details</span></td>
                    <td class="btns">
                        <button class="delete" data-name="${restaurantsData[i].name}">Delete</button>
                    </td>
                `;

                tbody.appendChild(row);
            }
        }
    }
}

// Add event listener to handle form submission
const cardForm = document.getElementById('cardForm');

if (cardForm) {
    cardForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from reloading the page
    
        // Get values from the form inputs
        const name = document.getElementById('name').value;
        const cuisine_nature = document.getElementById('cuisine_nature').value;
        const address = document.getElementById('address').value;
        const phone = document.getElementById('phone').value;
        const rating = document.getElementById('rating').value;
        const picture = document.getElementById('picture').value;
    
        // Prepare the data to send in the POST request
        const cardData = {
            name: name,
            cuisine_nature: cuisine_nature,
            address: address,
            phone: phone,
            rating: rating,
            picture: picture
        };
    
        // Send POST request to the server
        fetch('http://localhost:3000/restaurants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cardData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Card added:', data);
            alert('Card added successfully!');
            // Optionally, reset the form after submission
            document.getElementById('cardForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error adding the card.');
        });
    });
}

function deleteRestaurant(name) {
    // Send a DELETE request to the server
    fetch(`http://localhost:3000/restaurants/${name}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.ok) {
            alert('Restaurant deleted successfully!');
            // Re-fetch and re-render the updated restaurant list - Makes another GET request
            // return fetch('http://localhost:3000/restaurants')
            //     .then(response => response.json())
            //     .then(data => {
            //         renderRestaurants(data);
            //     });
        } else {
            return response.text().then(error => {
                throw new Error(error);
            });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete restaurant. Please try again.');
    });
}

/**
 * The URL http://localhost:3000/restaurants/${name} points to the restaurant resource on the server, where ${name} is replaced by the actual restaurant's name.
 */

document.getElementById("updateButton").addEventListener("click", async () => {
    const name = document.getElementById("name").value;
    const cuisine_nature = document.getElementById("cuisine_nature").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const rating = document.getElementById("rating").value;
    const picture = document.getElementById("picture").value;

    const requestData = {
        name,
        cuisine_nature,
        address,
        phone,
        rating,
        picture
    };

    try {
        const response = await fetch(`/restaurants/${name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestData)
        });

        if (response.ok) {
            const result = await response.json();
            alert("Restaurant updated successfully!");
            console.log(result);
        } else {
            const error = await response.text();
            alert(`Error: ${error}`);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating the restaurant.");
    }
});
