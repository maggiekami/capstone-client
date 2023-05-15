# RENEE CRAFTS

[Click here](https://github.com/maggiekami/capstone-server) to see the back-end repo.

## Description

An online store to allow customers who are interested in purchasing handcrafted items made using crochet from an individual supplier.

## Features

- Product Catalog: Display a list of products with relevant information such as images, price, description, rating.
- Shopping Cart: Allow users to add products to their shopping cart, view the cart, and modify the quantity or remove items as needed
- User account registration
- Order placement using database
- Checkout using Stripe

## Tech Stack

### Front-end

- React
- Sass
- Axios
- Yup
- React-modal

### Back-end

- Node.js
- Express
- Knex
- MySQL2
- Stripe
- BCrypt

## Environment dependency

### Front-end

Create a .env file and include:
REACT_APP_BACKEND_URL: example = http://localhost:8080

### Back-end

Create a .env file and include:
PORT: example = 8080

## Installation

Clone front-end repo locally:
git clone
git@github.com:maggiekami/capstone-client.git

Clone back-end repo locally:
git clone git@github.com:maggiekami/capstone-server.git

## Setup

Open the project folder and install dependencies
`npm install`

### Run:

Run react app locally

`npm start`

Run server locally

`npm run dev`
