const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Load restaurants data
const dataPath = path.join(__dirname, '../data/restaurants.json');

// GET all restaurants
app.get('/api/restaurants', (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const restaurants = JSON.parse(rawData).restaurants;
  res.json(restaurants);
});

// GET restaurant by ID
app.get('/api/restaurants/:id', (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const restaurants = JSON.parse(rawData).restaurants;
  const restaurant = restaurants.find(r => r.id === parseInt(req.params.id));
  
  if (restaurant) {
    res.json(restaurant);
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

// POST new restaurant
app.post('/api/restaurants', (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);
  const newRestaurant = {
    ...req.body,
    id: data.restaurants.length + 1
  };
  
  data.restaurants.push(newRestaurant);
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
  
  res.status(201).json(newRestaurant);
});

// DELETE restaurant
app.delete('/api/restaurants/:id', (req, res) => {
  const rawData = fs.readFileSync(dataPath);
  const data = JSON.parse(rawData);
  
  const index = data.restaurants.findIndex(r => r.id === parseInt(req.params.id));
  
  if (index !== -1) {
    data.restaurants.splice(index, 1);
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json({ message: 'Restaurant deleted successfully' });
  } else {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  ScrollReveal().reveal(".header__image img", {
    ...scrollRevealOption,
    origin: "right",
  });
  ScrollReveal().reveal(".header__content h2", {
    ...scrollRevealOption,
    delay: 500,
  });
  ScrollReveal().reveal(".header__content h1", {
    ...scrollRevealOption,
    delay: 1000,
  });
  
  ScrollReveal().reveal(".order__card", {
    ...scrollRevealOption,
    interval: 500,
  });
  
  ScrollReveal().reveal(".event__content", {
    duration: 1000,
  });
});