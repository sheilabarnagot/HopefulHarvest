-- Users Table
DROP TABLE IF EXISTS CartItems;
DROP TABLE IF EXISTS Cart;
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Images;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Products;
DROP TABLE IF EXISTS Categories;
DROP TABLE IF EXISTS Users;



CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(50),
    lastname VARCHAR(50),
    password VARCHAR(100) NOT NULL,
    address TEXT,
    phone_number VARCHAR(20)
);

-- Categories Table
CREATE TABLE Categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL,
    description TEXT
);

-- Products Table
CREATE TABLE Products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    user_id INTEGER REFERENCES Users(user_id),
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category_id INTEGER REFERENCES Categories(category_id)
);

-- Orders Table
CREATE TABLE Orders (
    order_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_amount DECIMAL(10, 2) NOT NULL,
    order_status VARCHAR(20) NOT NULL
);

CREATE TABLE Images (
    image_id SERIAL PRIMARY KEY,
    image_ref TEXT NOT NULL,
    user_id INTEGER UNIQUE REFERENCES Users(user_id) UNIQUE,
    product_id INTEGER UNIQUE REFERENCES Products(product_id)
);

-- OrderItems Table
CREATE TABLE OrderItems (
    order_item_id SERIAL PRIMARY KEY,
    order_id INTEGER REFERENCES Orders(order_id),
    product_id INTEGER REFERENCES Products(product_id),
    quantity INTEGER NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL
);

-- Cart Table
CREATE TABLE Cart (
    cart_id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES Users(user_id)
);

-- CartItems Table
CREATE TABLE CartItems (
    cart_item_id SERIAL PRIMARY KEY,
    cart_id INTEGER REFERENCES Cart(cart_id),
    product_id INTEGER REFERENCES Products(product_id),
    quantity INTEGER NOT NULL
);