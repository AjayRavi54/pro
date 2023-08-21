const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const mysql = require('mysql');
 const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
 app.get('/', (req, res) => {
    res.sendFile(__dirname + '/profile.html');
});
 app.use(express.static('photos'));
app.use(express.static('public'));
// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'ajay21',
    password: 'Ajay@2001',
    database: 'MySQL',
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');

    // Create the 'users' table if it doesn't exist
    const createTableQuery = `
    CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
        
    )
`;
    connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log('Users table created or already exists');

       
         // Added closing parenthesis here
    });
});
// for login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // You should hash and salt the password before storing it in the database.
    // Here, we are just demonstrating a simple query without proper password hashing.
    const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    connection.query(sql, (err, results) => {
        if (err) {
            console.error('Error executing MySQL query:', err);
            return res.status(500).send('Error occurred during login');
        }

        if (results.length > 0) {
           
              res.redirect('/index.html');
            
        } else {
            res.send('Invalid username or password'); 
           
        }
    });
});
// Route to handle sign-up form submission
app.post('/signup', (req, res) => {
    const { username,  email ,password} = req.body;

    // Check if the username already exists
    const checkQuery = `SELECT * FROM users WHERE username = ?`;
    connection.query(checkQuery, [username], (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            res.send('Username already exists. Please choose a different username.');
        } else {
            // Insert the new user into the database
            const insertQuery = `INSERT INTO users (username,  email, password) VALUES (?, ?, ?)`;
            connection.query(insertQuery, [username,  email, password], (err, results) => {
                if (err) throw err;
                res.redirect('/index.html');
              
            
           
            });
        }
    });
});
 app.get('/homeserver', (req, res) => {
 
        res.redirect('/index.html');
    
});
 app.get('/htmlserver', (req, res) => {
    res.redirect('/html.html');
});
 app.get('/cssserver', (req, res) => {
    res.redirect('/css.html');
});
 app.get('/jsserver', (req, res) => {
    res.redirect('/js.html');
});
 app.get('/djangoserver', (req, res) => {
    res.redirect('/dj.html');
});
 app.get('/laravelserver', (req, res) => {
    res.redirect('/php.html');
});
 app.get('/nodeserver', (req, res) => {
    res.redirect('/nodejs.html');
});
 app.get('/mysqlserver', (req, res) => {
    res.redirect('/mysql.html');
    
});
 app.get('/springserver', (req, res) => {
    res.redirect('/spboot.html');
});
 app.get('/oracleserver', (req, res) => {
    res.redirect('/oracle.html');
});
 app.listen(port, () => {});