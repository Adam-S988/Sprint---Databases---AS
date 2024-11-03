const { Pool } = require("pg");

// PostgreSQL connection
const pool = new Pool({
  user: "postgres", //This _should_ be your username, as it's the default one Postgres uses
  host: "localhost",
  database: "Movies", //This should be changed to reflect your actual database
  password: "Shea_Butter", //This should be changed to reflect the password you used when setting up Postgres
  port: 5432,
});

/**
 * Creates the database tables, if they do not already exist.
 */
async function createTable() {
  // TODO: Add code to create Movies, Customers, and Rentals tables
  const query = `
  CREATE TABLE IF NOT EXISTS movies (
    id serial NOT NULL PRIMARY KEY,
    movie_title TEXT,
    movie_year INT,
    movie_genre TEXT,
    movie_director TEXT
);

  CREATE TABLE IF NOT EXISTS customers (
      id serial NOT NULL PRIMARY KEY,
      first_name TEXT,
      last_name TEXT,
      email TEXT,
      phone_number TEXT
  );

  CREATE TABLE IF NOT EXISTS rentals (
    customer_id int,
    movie_id int,
    rental_date DATE,
    return_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (movie_id) REFERENCES movies(id),
    PRIMARY KEY (customer_id, movie_id)
);
  `;

  try {
    await pool.query(query);
    console.log("Table created.");
  } catch (error) {
    console.error("Error creating table.");
  }
}

/**
 * Inserts a new movie into the Movies table.
 *
 * @param {string} movie_title Title of the movie
 * @param {number} movie_year Year the movie was released
 * @param {string} movie_genre Genre of the movie
 * @param {string} movie_director Director of the movie
 */
async function insertMovie(
  movie_title,
  movie_year,
  movie_genre,
  movie_director
) {
  // TODO: Add code to insert a new movie into the Movies table
  const query = {
    text: "INSERT INTO movies (movie_title, movie_year, movie_genre, movie_director) VALUES ($1, $2, $3, $4)",
    values: [movie_title, movie_year, movie_genre, movie_director],
  };

  try {
    await pool.query(query);
    console.log("Movie Added!");
  } catch (error) {
    console.error("Error adding movie.");
  }
}

/**
 * Prints all movies in the database to the console
 */
async function displayMovies() {
  // TODO: Add code to retrieve and print all movies from the Movies table
  const query = "SELECT * FROM movies";

  try {
    const result = await pool.query(query);

    if (result.rows.length > 0) {
      result.rows.forEach((row) => {
        console.log(
          `${row.id}: ${row.movie_title} (${row.movie_year}) - ${row.movie_genre}        Directed by: ${row.movie_director}`
        );
      });
    } else {
      console.log("No movies to display.");
    }
  } catch (error) {
    console.error("Error displaying movies.");
  }
}

/**
 * Updates a customer's email address.
 *
 * @param {number} customerId ID of the customer
 * @param {string} newEmail New email address of the customer
 */
async function updateCustomerEmail(customerId, newEmail) {
  // TODO: Add code to update a customer's email address
  const query = {
    text: "UPDATE customers SET email = $2 WHERE id = $1",
    values: [customerId, newEmail],
  };

  try {
    await pool.query(query);
    console.log("Customer email updated!");
  } catch (error) {
    console.error("Error encounted updating customer email.");
  }
}

/**
 * Removes a customer from the database along with their rental history.
 *
 * @param {number} customerId ID of the customer to remove
 */
async function removeCustomer(customerId) {
  // TODO: Add code to remove a customer and their rental history
  const query1 = {
    text: `
    DELETE FROM rentals WHERE customer_id = $1;
    `,
    values: [customerId],
  };

  try {
    await pool.query(query1);
    console.log("Customer deleted.");
  } catch (error) {
    console.error("Error encountered while trying to delete customer.");
  }

  const query2 = {
    text: `DELETE FROM customers WHERE id = $1;`,
    values: [customerId],
  };

  try {
    await pool.query(query2);
    console.log("Customer deleted from database.");
  } catch (error) {
    console.error("Error encountered while trying to delete customer.");
  }
}

/**
 * Prints a help message to the console
 */
function printHelp() {
  console.log("Usage:");
  console.log("  insert <title> <year> <genre> <director> - Insert a movie");
  console.log("  show - Show all movies");
  console.log("  update <customer_id> <new_email> - Update a customer's email");
  console.log("  remove <customer_id> - Remove a customer from the database");
}

/**
 * Runs our CLI app to manage the movie rentals database
 */
async function runCLI() {
  await createTable();

  const args = process.argv.slice(2);
  switch (args[0]) {
    case "insert":
      if (args.length !== 5) {
        printHelp();
        return;
      }
      await insertMovie(args[1], parseInt(args[2]), args[3], args[4]);
      break;
    case "show":
      await displayMovies();
      break;
    case "update":
      if (args.length !== 3) {
        printHelp();
        return;
      }
      await updateCustomerEmail(parseInt(args[1]), args[2]);
      break;
    case "remove":
      if (args.length !== 2) {
        printHelp();
        return;
      }
      await removeCustomer(parseInt(args[1]));
      break;
    default:
      printHelp();
      break;
  }
}

runCLI();
