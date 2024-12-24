
const restaurantsContainer = document.getElementById("restaurants-list");
const searchInput = document.getElementById("searchInput");


// Fetch restaurants and display them
function fetchAndDisplayRestaurants(query = '') {
    // Make an API call to the server to fetch restaurant data
    fetch(`http://localhost:3500/restaurants?query=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            displayRestaurants(data);
        })
        .catch(error => console.error('Error:', error));
}

// Create star rating HTML
function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    let starsHtml = '';

    for (let i = 0; i < 5; i++) {
        starsHtml += i < fullStars
            ? `<svg viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
            </svg>`
            : `<svg viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
            </svg>`;
    }
    return starsHtml;
}

// Display restaurants in the container
function displayRestaurants(restaurants) {
    restaurantsContainer.innerHTML = "";  // Clear existing content

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement("div");
        restaurantCard.classList.add("restaurant-card");

        restaurantCard.innerHTML = `
            <a href="/" class="hero-image-container">
                <img class="hero-image" src="${restaurant.image}" alt="${restaurant.name}" onerror="this.src='https://via.placeholder.com/300x200'"/>
            </a>
            <main class="main-content">
                <h1><a href="#">${restaurant.name}</a></h1>
                <p>${restaurant.cuisine}</p>
                <div class="flex-row">
                    <div class="level">
                        ${createStarRating(restaurant.rating)}
                    </div>
                    <div class="time-left">
                        <img src="https://i.postimg.cc/prpyV4mH/clock-selection-no-bg.png" alt="clock" class="small-image"/>
                        <p>${restaurant.isOpen ? 'Open Now' : 'Closed Now'}</p>
                    </div>
                </div>
            </main>
            <div class="card-attribute">
                ${restaurant.website ? ` 
                    <a href="${restaurant.website}" target="_blank">
                        <img src="/photos/icons8-website-48.png" alt="website" class="small-avatar" onerror="this.src='https://via.placeholder.com/48'"/>
                        <p>Website</p>
                    </a>
                ` : ''}
            </div>
        `;
        restaurantsContainer.appendChild(restaurantCard);
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayRestaurants();  // Display all restaurants initially

    // Add search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;  // Get search query
        fetchAndDisplayRestaurants(query);  // Fetch and display filtered restaurants
    });
});




function searchRestaurant(value) {
    const cardsContainer = document.querySelector('.restaurants-list');
    cardsContainer.innerHTML = '';

    if (value.trim() === '') {
        renderRestaurants(restaurantsData);
    }
    else {
        for (let i = 0; i < restaurantsData.length; i++) {
            if (restaurantsData[i].name.toLowerCase().includes(value.toLowerCase())) {
                const card = document.createElement('div');
                card.classList.add('card');

                card.innerHTML = `
                    <img src="${restaurantsData[i].picture}" alt="${restaurantsData[i].name}">
                    <div class="card-content">
                        <h2 class="name">${restaurantsData[i].name}</h2>
                        <p><strong>Cuisine:</strong> ${restaurantsData[i].cuisine_nature}</p>
                        <p class="notation">⭐ ${restaurantsData[i].rating}</p>
                        <span class="details-card" onclick="showDetails(${restaurantsData[i].id})">Show Details</span>
                    </div>
                `;

                cardsContainer.appendChild(card);
            }
        }
    }
}