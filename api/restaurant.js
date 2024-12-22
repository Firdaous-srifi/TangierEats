window.onload = function() {
    // Get restaurant ID from URL
    let restaurantId = window.location.search;
    restaurantId = restaurantId.replace('?id=', '');

    // Fetch restaurant data
    fetch("data/restaurants.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // Find the restaurant with matching ID
            let restaurant = data.restaurants.find(r => r.id === parseInt(restaurantId));
            
            if (restaurant) {
                showRestaurantDetails(restaurant);
            } else {
                document.getElementById("container").innerHTML = "Restaurant not found";
            }
        })
        .catch(function(error) {
            console.error('Error:', error);
            document.getElementById("container").innerHTML = "Error loading restaurant details";
        });
}

// Function to create star rating display
function getStarRating(rating) {
    return '⭐'.repeat(Math.floor(rating));
}

// Function to display restaurant details
function showRestaurantDetails(restaurant) {
    let containerDiv = document.getElementById("container");
    
    let restaurantHTML = `
        <article class="restaurant-details">
            <div class="restaurant-cover-container">
                <img src="${restaurant.image}" alt="${restaurant.name}" class="restaurant-cover">
            </div>
            
            <div class="restaurant-info">
                <div class="restaurant-header">
                    <div class="restaurant-title">
                        <h1>${restaurant.name}</h1>
                        <p class="restaurant-cuisine">${restaurant.cuisine}</p>
                    </div>
                    <div class="restaurant-rating">
                        <div class="stars">${getStarRating(restaurant.rating)}</div>
                        <span>${restaurant.rating}/5</span>
                    </div>
                </div>

                <div class="status-badge">
                    <i class="far fa-clock"></i>
                    <span>${restaurant.isOpen ? 'Open Now' : 'Closed Now'}</span>
                </div>

                <div class="restaurant-details-grid">
                    <div class="details-column">
                        <div class="detail-item">
                            <h3>Address</h3>
                            <p>${restaurant.address}</p>
                        </div>
                        <div class="detail-item">
                            <h3>Opening Hours</h3>
                            <p>${restaurant.hours}</p>
                        </div>
                    </div>
                    
                    <div class="details-column">
                        <div class="detail-item">
                            <h3>Contact</h3>
                            ${restaurant.phone ? `<p>📞 ${restaurant.phone}</p>` : ''}
                            ${restaurant.email ? `<p>✉️ <a href="mailto:${restaurant.email}">${restaurant.email}</a></p>` : ''}
                        </div>
                        <div class="detail-item">
                            <h3>Website</h3>
                            ${restaurant.website ? 
                                `<p>🌐 <a href="${restaurant.website}" target="_blank">${restaurant.website}</a></p>` : 
                                '<p>Not available</p>'}
                        </div>
                        <div class="detail-item">
                            <h3>Price Range</h3>
                            <p>${restaurant.priceRange}</p>
                        </div>
                        <div class="detail-item">
                            <h3>Special Features</h3>
                            <p>${restaurant.specialFeatures.join(', ')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </article>
    `;
    
    containerDiv.innerHTML = restaurantHTML;
}