let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let pg = require('pg');
let cors = require('cors');
const PORT = 3001;

let pool = new pg.Pool({
  user: 'postgres',
  database: 'masterclass',
	password: '',
	host: 'localhost',
	port: 5432,
	max: 10,
}); 

// Instantiate application
let app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

// Cors on ExpressJS
app.use((request, response, next) => {
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "Orign, X-Requested-With, Content-Type, Accept");
	next();
});

app.get('/api/instructors', (request, response) => {
  console.log('From server - instructors request');

  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query('SELECT * FROM instructor', (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  })
  
});

app.get('/api/courses', (request, response) => {
  console.log('From server - courses request');

  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query('SELECT * FROM course', (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  })
  
});

app.get('/api/lessons', (request, response) => {
  console.log('From server - lessons request');

  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query('SELECT * FROM lesson', (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  })
  
});

app.get('/api/misc', (request, response) => {
  console.log('From server - misc request');

  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query('SELECT * FROM misc', (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  })
  
});

app.get('/api/reviews', (request, response) => {
  console.log('From server - reviews request');

  pool.connect((err, db, done) => {
    if (err) {
      return response.status(400).send(err);
    } else {
      db.query('SELECT * FROM review', (err, table) => {
        done();
        if (err) {
          return response.status(400).send(err);
        } else {
          return response.status(200).send(table.rows);
        }
      });
    }
  })
  
});

app.listen(PORT, () => console.log('Listening on port ' + PORT));
