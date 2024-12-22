async function fetchAndDisplayRestaurantDetails(id) {
    try {
        const response = await fetch(`/api/restaurants/${id}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const restaurant = await response.json();
        displayRestaurantDetails(restaurant);
    } catch (error) {
        console.error('Error loading restaurant details:', error);
    }
}

function displayRestaurantDetails(restaurant) {
    // Clear the main container and show the details
    restaurantsContainer.innerHTML = `
        <div class="restaurant-details">
            <img src="${restaurant.image}" alt="${restaurant.name}" onerror="this.src='https://via.placeholder.com/300x200'" />
            <h1>${restaurant.name}</h1>
            <p>${restaurant.cuisine}</p>
            <p>Rating: ${createStarRating(restaurant.rating)}</p>
            <p>${restaurant.description}</p>
            <p>${restaurant.isOpen ? 'Open Now' : 'Closed Now'}</p>
            <p>Contact: ${restaurant.contact}</p>
            <a href="${restaurant.website}" target="_blank">Visit Website</a>
            <button class="back-btn">Back to List</button>
        </div>
    `;

    // Add functionality to the back button
    document.querySelector('.back-btn').addEventListener('click', fetchAndDisplayRestaurants);
}


function fetchAndDisplayRestaurants() {
    // Existing code to fetch and display restaurants...

    // Attach event listeners to "Details" buttons
    const detailsButtons = document.querySelectorAll('.details-btn');
    detailsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const restaurantId = event.target.dataset.id;
            fetchAndDisplayRestaurantDetails(restaurantId);
        });
    });
}
