
const express = require('express');

const app = express();

const port = process.env.PORT || 3000;



// const restaurants = require('modules/restaurants.js');

app.listen(port, () => 
    console.log(`listening on port ${port}`

));