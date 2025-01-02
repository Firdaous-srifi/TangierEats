Project Overview
This project is aimed at creating an interactive and dynamic blog to explore the best restaurants in Tangier, Morocco. The city is known for its diverse culinary scene, offering a wide range of both local and international cuisines. However, it can be challenging for locals and visitors to easily find the best dining spots. This project addresses that need by providing a blog that displays restaurant details, allows users to search, filter, and explore restaurant options.

Features
Discover Restaurants: A list of restaurants with essential information.
Search and Filter: Users can search for restaurants by name or specialty cuisine and filter the results by type of cuisine.
Restaurant Details: Each restaurant has a detailed page displaying its full information.
Admin Management: An admin interface to manage restaurants, including the ability to add, delete, and modify entries.
Pages to be Created
1. index.html: List of Restaurants
This page will display all the restaurants available in the API in a card format. Each card will include:

Restaurant Image: A photo of the restaurant.
Restaurant Name: The name of the restaurant.
Cuisine Specialty: The type of cuisine the restaurant specializes in.
Rating: Average user rating of the restaurant.
Details Link: A clickable link leading to the restaurant's detail page (restaurant.html).
Additional Features:

Search Bar: Allows users to search for restaurants by name or cuisine.
Sorting Feature (Bonus): Users can sort restaurants based on rating.
Cuisine Filter (Bonus): Users can filter restaurants by type of cuisine (e.g., Moroccan, Italian, etc.).
2. restaurant.html: Restaurant Details Page
This page will show detailed information for a single restaurant, including:

Restaurant name, image, address, phone number, email, type of cuisine, rating, website link (if available), and a brief description.
3. admin.html: Admin Page
The admin page will provide management features for restaurant data:

List of Restaurants: Display a list of all restaurants with an option to delete.
Add New Restaurant: A form to add new restaurant entries to the API.
Search Functionality: Admins can search restaurants by name or cuisine type.
Edit Functionality (Bonus): Admins can modify existing restaurant details.
Data Structure (JSON)
The restaurant data will be structured in a JSON file, which will be used to populate the blog pages and API. Each restaurant entry will contain the following fields:

json
Copy code
{
  "name": "Restaurant Name",
  "address": "Restaurant Address",
  "phone": "Restaurant Phone Number",
  "email": "Restaurant Email",
  "cuisine": "Cuisine Type",
  "image": "Image URL",
  "rating": 4.5,
  "website": "http://restaurantwebsite.com"
}
API Endpoints
GET /restaurants: Retrieve the list of all restaurants.
GET /restaurants/{id}: Retrieve details of a specific restaurant by its ID.
POST /restaurants: Add a new restaurant.
DELETE /restaurants/{id}: Delete a restaurant by its ID.
Technology Stack
Frontend: HTML, CSS, JavaScript
Backend: Node.js (Express) for API creation
Database: JSON file (for simplicity in this prototype)
Tools:
Postman: To test API endpoints
VS Code: Code editor
Setup and Installation
Prerequisites
Node.js and npm installed.
Installation Steps
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/tanger-restaurant-blog.git
cd tanger-restaurant-blog
Install dependencies:

bash
Copy code
npm install
Start the server:

bash
Copy code
npm start
Access the blog pages by visiting:

http://localhost:3000 for the main blog page (index.html).
http://localhost:3000/restaurant/{id} for restaurant details (restaurant.html).
http://localhost:3000/admin for the admin panel (admin.html).
Testing the API
You can test the API using Postman:

GET /restaurants: Get a list of all restaurants.
GET /restaurants/{id}: Get details of a specific restaurant.
POST /restaurants: Add a new restaurant.
DELETE /restaurants/{id}: Delete a restaurant.
Bonus Features
Sorting by Rating: Sort restaurants by their average rating in descending or ascending order.
Cuisine Filter: Filter restaurants based on cuisine type (e.g., Moroccan, Italian, etc.).
Admin Edit Functionality: Allow admins to modify details of an existing restaurant.
