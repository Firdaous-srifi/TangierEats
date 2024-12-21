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

//////////////////////////////////////////

const restaurantsContainer = document.getElementById("section-container");

//****** Fetching and Displaying Restaurants ******/
function fetchAndDisplayRestaurants() {
  fetch("data/restaurants.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      displayRestaurants(data.restaurants); // Assuming JSON data has a `restaurants` key
    })
    .catch((error) => {
      console.error(error);
    });
}

//************ FUNCTION: displayRestaurants ***************//
function displayRestaurants(restaurants) {
  restaurantsContainer.innerHTML = ""; // Clear the container

  restaurants.forEach((restaurant) => {
    let restaurantItem = document.createElement("div");
    restaurantItem.classList.add("restaurant-card");

    restaurantItem.innerHTML = `
      <div class="product-card">
        <div class="card-banner">
          <img src="${restaurant.image}" alt="${restaurant.name}" class="img-cover" />
        </div>
        <div class="card-content">
          <h2 class="restaurant-name">${restaurant.name}</h2>
          <p class="restaurant-cuisine">${restaurant.cuisine}</p>
          <p class="restaurant-address">${restaurant.address}</p>
          <p class="restaurant-phone">📞 ${restaurant.phone}</p>
          <p class="restaurant-email">✉️ <a href="mailto:${restaurant.email}">${restaurant.email}</a></p>
          <p class="restaurant-website">🌐 <a href="${restaurant.website}" target="_blank">${restaurant.website}</a></p>
          <p class="restaurant-rating">⭐ ${restaurant.rating} / 5</p>
          <p class="restaurant-hours">🕒 ${restaurant.hours}</p>
          <p class="restaurant-price">💰 ${restaurant.priceRange}</p>
          <p class="restaurant-features">✨ ${restaurant.specialFeatures.join(", ")}</p>
        </div>
      </div>
    `;
    restaurantsContainer.appendChild(restaurantItem);
  });

  window.restaurants = restaurants; // Save restaurants globally
}

// Initialize the fetching process
fetchAndDisplayRestaurants();
