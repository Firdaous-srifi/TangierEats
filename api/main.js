// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));

// // Load restaurants data
// const dataPath = path.join(__dirname, '../data/restaurants.json');

// // GET all restaurants
// app.get('/api/restaurants', (req, res) => {
//   const rawData = fs.readFileSync(dataPath);
//   const restaurants = JSON.parse(rawData).restaurants;
//   res.json(restaurants);
// });

// // GET restaurant by ID
// app.get('/api/restaurants/:id', (req, res) => {
//   const rawData = fs.readFileSync(dataPath);
//   const restaurants = JSON.parse(rawData).restaurants;
//   const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  
//   if (restaurant) {
//     res.json(restaurant);
//   } else {
//     res.status(404).json({ message: 'Restaurant not found' });
//   }
// });

// // POST new restaurant
// app.post('/api/restaurants', (req, res) => {
//   const rawData = fs.readFileSync(dataPath);
//   const data = JSON.parse(rawData);
//   const newRestaurant = {
//     ...req.body,
//     id: data.restaurants.length + 1
//   };
  
//   data.restaurants.push(newRestaurant);
//   fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
//   res.status(201).json(newRestaurant);
// });

// // DELETE restaurant
// app.delete('/api/restaurants/:id', (req, res) => {
//   const rawData = fs.readFileSync(dataPath);
//   const data = JSON.parse(rawData);
  
//   const index = data.restaurants.findIndex(r => r.id === parseInt(req.params.id));
  
//   if (index !== -1) {
//     data.restaurants.splice(index, 1);
//     fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
//     res.json({ message: 'Restaurant deleted successfully' });
//   } else {
//     res.status(404).json({ message: 'Restaurant not found' });
//   }
// });

////////////////////////////////////////////////////////////////////
const restaurantsContainer = document.getElementById("section-container");

// Function to fetch restaurants from JSON file
async function fetchAndDisplayRestaurants() {
    try {
        const response = await fetch('/data/restaurants.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayRestaurants(data.restaurants);
    } catch (error) {
        console.error('Error loading restaurants:', error);
        restaurantsContainer.innerHTML = `
            <div class="error-message">
                Error loading restaurants: ${error.message}
            </div>
        `;
    }
}

function createStarRating(rating) {
    const fullStars = Math.floor(rating);
    let starsHtml = '';
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            starsHtml += `
                <svg viewBox="0 0 16 16" class="bi bi-star-fill" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"></path>
                </svg>`;
        } else {
            starsHtml += `
                <svg viewBox="0 0 16 16" class="bi bi-star" fill="currentColor" height="16" width="16" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"></path>
                </svg>`;
        }
    }
    return starsHtml;
}

function displayRestaurants(restaurants) {
    if (!restaurants || restaurants.length === 0) {
        restaurantsContainer.innerHTML = '<p>No restaurants found.</p>';
        return;
    }

    restaurantsContainer.innerHTML = "";

    restaurants.forEach(restaurant => {
        const restaurantCard = document.createElement("div");
        restaurantCard.classList.add("restaurants-list");

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

// Initialize when the page loads
document.addEventListener('DOMContentLoaded', fetchAndDisplayRestaurants);