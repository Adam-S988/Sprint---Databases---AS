--Create Tables
CREATE TABLE movies (id SERIAL PRIMARY KEY, movie_title TEXT, movie_year INT, movie_genre TEXT, movie_director TEXT)

CREATE TABLE customers (id SERIAL PRIMARY KEY, first_name TEXT, last_name TEXT, email TEXT, phone_number TEXT)

CREATE TABLE rentals (id SERIAL PRIMARY KEY, customer_id INT REFERENCES customers(id), movie_id INT REFERENCES movies(id), rental_date DATE, return_date DATE)

--Insert Data
INSERT INTO movies (movie_title, movie_year, movie_genre, movie_director)
VALUES ('Back to the Future', 1985, 'Sci Fi', 'Robert Zemeckis'),
('Mean Girls', 2004, 'Teen Comedy', 'Mark Waters'),
('Goodbye Lenin!', 2003, 'Tragicomedy', 'Wolfgang Becker'),
('Get Smart', 2008, 'Spy Action Comedy', 'Peter Segal'),
('Jumanji', 1995, 'Dark Fantasy Adventure', 'Joe Johnston')

INSERT INTO customers (first_name, last_name, email, phone_number)
VALUES ('Brandon', 'Shea', 'brandon.shea@keyin.com', '709-867-5309'),
('Brad', 'Ayers', 'bradley.ayers@keyin.com', '709-123-4567'),
('Angela', 'Flynn', 'angela.flynn@keyin.com', '709-431-9331'),
('Kyle', 'Hollett', 'kyle.hollett@keyin.com', '709-231-2312'),
('Chelsea', 'Mayne', 'chelsea.mayne@keyin.com', '709-476-7208')

INSERT INTO rentals (customer_id, movie_id, rental_date, return_date)
VALUES ('1', '3', 'October 2 2024', 'October 9 2024'),
('1', '5', 'October 2 2024', 'October 9 2024'),
('2', '2', 'October 4 2024', 'October 9 2024'),
('2', '4', 'October 4 2024', 'October 9 2024'),
('2', '5', 'October 4 2024', 'October 9 2024'),
('3', '1', 'October 4 2024', 'October 11 2024'),
('4', '1', 'October 7 2024', 'October 14 2024'),
('4', '2', 'October 7 2024', 'November 14 2024'),
('4', '4', 'October 7 2024', 'November 14 2024'),
('5', '3', 'October 8 2024', 'November 13 2024'),
('1', '3', 'October 10 2024', 'November 17 2024')

--List all movies rented by a customer based on their email
SELECT movies.movie_title, rentals.rental_date, rentals.return_date
FROM customers
JOIN rentals ON customers.id = rentals.customer_id
JOIN movies ON movies.id = rentals.movie_id
WHERE customers.email = 'bradley.ayers@keyin.com';

--List all customers who rented Goodbye Lenin!
SELECT customers.first_name || ' ' || customers.last_name AS rented_goodbye_lenin 
FROM customers
JOIN rentals ON customers.id = rentals.customer_id
JOIN movies ON movies.id = rentals.movie_id
WHERE movies.id = 3;

--List the rental history of Mean Girls
SELECT rentals.rental_date, rentals.return_date, customers.first_name || ' ' || customers.last_name AS customer_name
FROM movies
JOIN rentals ON movies.id = rentals.customer_id
JOIN customers ON customers.id = rentals.movie_id
WHERE movies.movie_title = 'Mean Girls';