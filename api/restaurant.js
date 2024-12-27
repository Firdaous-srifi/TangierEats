const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const Joi = require("joi");

const restaurants = require(path.join(__dirname, "..", "data", "data.json"));
/** if require not exist:
 * fs.readFile(restaurants, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading the file:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }

        res.status(200).json(JSON.parse(data));
    });
 */

function validateSchema(restaurant) {
    const restaurantSchema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(100)
            .required(),
        cuisine_nature: Joi.string().required(),
        address: Joi.string().required(),
        phone: Joi.string().required(),
        rating: Joi.number()
            .min(0)
            .max(5)
            .required(),
        picture: Joi.string()
            .uri()
            .optional(),
        site: Joi.string()
            .uri()
            .optional()
    });
    return restaurantSchema.validate(restaurant, {abortEarly: false});
}

function writeFile(res, data, statusCode = 200) {
    fs.writeFile(
        path.join(__dirname, "../data/data.json"),
        JSON.stringify(restaurants, null, 2),
        (err) => {
            if (err) {
                console.error("Error writing to the file:", err);
                return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(statusCode).json(data);
        }
    );
}

router.route("/")
    .get((req, res) => {
        res.json(restaurants)
    })
    .post((req, res) => {
        const {error} = validateSchema(req.body);

        if (error) {
            console.log(error);
            return res.status(400).json({message: error.details[0].message});
        }

        const card = {
            id: restaurants.length + 1,
            name: req.body.name,
            cuisine_nature: req.body.cuisine_nature,
            address: req.body.address,
            phone: req.body.phone,
            rating: req.body.rating,
            picture: req.body.picture,
        }

        restaurants.push(card);

        /** restaurants.push(card);
            res.send(card); 
         ** Incorrect handling of the restaurants: restaurants is a string representing the path to the JSON file, not an array. You should read the file, parse it, modify it, and then write it back to the file.
        */

         writeFile(res, card, 200);
    })

router.route("/:name")
    .put((req, res) => {
        const restaurant = restaurants.find(r => r.name === req.params.name);

        if (!restaurant) {
            return res.status(404).send("The restaurant with the given name not found!");
        }
        else {
            restaurant.name = req.body.name;
            restaurant.cuisine_nature = req.body.cuisine_nature;
            restaurant.address = req.body.address;
            restaurant.phone = req.body.phone;
            restaurant.rating = req.body.rating;
            restaurant.picture = req.body.picture;

            writeFile(res, restaurant, 200);
        }
    })
    .delete((req, res) => {
        const restaurant = restaurants.find(r => r.name === req.params.name);

        if (!restaurant) {
            return res.status(404).send("The restaurant with the given name not found!");
        }
        
        const index = restaurants.indexOf(restaurant);

        restaurants.splice(index, 1);

        writeFile(res, index, 200);

        // fs.writeFile(
        //     path.join(__dirname, "../data/data.json"),
        //     JSON.stringify(restaurants, null, 2),
        //     (err) => {
        //         if (err) {
        //             console.error("Error writing to the file:", err);
        //             return res.status(500).json({ error: "Internal Server Error" });
        //         }
        //         // Respond with a success message
        //         res.status(200).json(index);
        //     }
        // );
    });

module.exports = router;