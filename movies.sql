--Create Tables
CREATE TABLE movies (id SERIAL PRIMARY KEY, movie_title TEXT, movie_year INT, movie_genre TEXT, movie_director TEXT)

CREATE TABLE customers (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, phone_number TEXT)

CREATE TABLE rentals (customer_id INT REFERENCES customers(id), movie_id INT REFERENCES movies(id), rental_date DATE, return_date DATE, PRIMARY KEY (customer_id, movie_id))