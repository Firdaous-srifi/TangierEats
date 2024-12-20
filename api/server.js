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
const booksContainer = document.getElementById("section-container");

//***fetchiiing */
function fetchAndDisplayBooks() {
  fetch("data/restaurants.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      return response.json();
    })
    .then((data) => {
      displayBooks(data);
    })
    .catch((error) => {
      console.error(error);
    });
}


////************FUNCTION displayBooks ***************/
function displayBooks(books) {
  booksContainer.innerHTML = "";

  books.forEach((book, i) => {
    let bookItem = document.createElement("li");
    bookItem.innerHTML = `
      <div class="product-card">
          <span class="card-badge">New</span>
          <div class="card-banner img-holder" style="--width: 384; --height: 480;">
              <img src="${book.cover}" width="384" height="480" loading="lazy" class="img-cover">
              <div class="card-action">
                  <a href="details.html?id=${i}" class="action-btn details" aria-label="Quick View" title="Quick View">
                      <ion-icon name="eye-outline" aria-hidden="true"></ion-icon>
                  </a>
                  <button class="action-btn wishlist" aria-label="Add to Wishlist" title="Add to Wishlist" onclick="addToWishlist(${i})">
                      <ion-icon name="heart-outline" aria-hidden="true"></ion-icon>
                  </button>
              </div>
          </div>
          <br>
          <div class="card-content">
              <h2 class="card-title h3">${book.title}</h2>
              <h2 class="book-author">${book.author?.fullname || "Unknown Author"}</h2>
          </div>
      </div>`;
    booksContainer.appendChild(bookItem);
  });

  window.books = books; // Save books globally
}