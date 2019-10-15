CREATE DATABASE Bamazon;

USE Bamazon;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(6,2) DEFAULT 0,
  stock_quantity INT DEFAULT 0,
  PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Starting an Etsy Business", "Books", 19.95, 10),
    ("Girls and their Cats", "Books", 24.95, 5),
    ("The Soulful Art of Persuasion", "Books", 15.95, 20),
    ("Bamboo Spatula", "Kitchenware", 2.99, 50),
    ("Pyrex Cake Pan, 9x9", "Kitchenware", 7.50, 13),
    ("Monopoly", "Board Games", 7.00, 2),
    ("Cattan", "Board Games", 3.49, 5),
    ("Checkers", "Board Games", 2.25, 6),
    ("Violin Rosin", "Musical Instruments", 5.00, 30),
    ("Viola Mute", "Musical Instruments", 1.50, 22);

SELECT * FROM Bamazon.products;

CREATE TABLE departments (
  id INTEGER(11) NOT NULL AUTO_INCREMENT,
  name VARCHAR(20) NOT NULL,
  overhead FLOAT(11, 2),
  PRIMARY KEY (id)
);

INSERT INTO departments (name, overhead)
VALUES ("Books", 1000),
      ("Kitchenware", 5000),
      ("Board Games", 52),
      ("Musical Instruments", 29);