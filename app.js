const express = require('express');
const mysql = require('mysql2');
const multer = require('multer');
const app = express();
const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Create MySQL connection
const connection = mysql.createConnection({
    host: 'server',
    user: 'root',
    password: '',
    database: 'studentplanner'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Set up view engine
app.set('view engine', 'ejs');
// Enable static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

// Task routes
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM task';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving tasks');
        }
        res.render('tasks', { tasks: results });
    });
});

app.get('/task/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'SELECT * FROM task WHERE taskId = ?';
    connection.query(sql, [taskId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving task by ID');
        }
        if (results.length > 0) {
            res.render('task', { task: results[0] });
        } else {
            res.status(404).send('Task not found');
        }
    });
});

app.get('/addTask', (req, res) => {
    res.render('addTask');
});

app.post('/addTask', (req, res) => {
    const { title, description, due_date } = req.body;
    const sql = 'INSERT INTO task (title, description, due_date) VALUES (?,?,?)';
    connection.query(sql, [title, description, due_date], (error, results) => {
        if (error) {
            console.error('Error adding task:', error.message);
            res.status(500).send('Error adding task');
        } else {
            res.redirect('/tasks');
        }
    });
});

app.get('/editTask/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'SELECT * FROM task WHERE taskId = ?';
    connection.query(sql, [taskId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving task by ID');
        }
        if (results.length > 0) {
            res.render('editTask', { task: results[0] });
        } else {
            res.status(404).send('Task not found');
        }
    });
});

app.post('/editTask/:id', (req, res) => {
    const taskId = req.params.id;
    const { title, description, due_date } = req.body;
    const sql = 'UPDATE task SET title = ?, description = ?, due_date = ? WHERE taskId = ?';
    connection.query(sql, [title, description, due_date, taskId], (error, results) => {
        if (error) {
            console.error('Error updating task:', error);
            res.status(500).send('Error updating task');
        } else {
            res.redirect('/tasks');
        }
    });
});

app.get('/deleteTask/:id', (req, res) => {
    const taskId = req.params.id;
    const sql = 'DELETE FROM task WHERE taskId = ?';
    connection.query(sql, [taskId], (error, results) => {
        if (error) {
            console.error('Error deleting task:', error);
            res.status(500).send('Error deleting task');
        } else {
            res.redirect('/tasks');
        }
    });
});

// Grade routes
app.get('/grades', (req, res) => {
    const sql = 'SELECT * FROM grade';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving grades');
        }
        res.render('grades', { grades: results });
    });
});

app.get('/grade/:id', (req, res) => {
    const gradeId = req.params.id;
    const sql = 'SELECT * FROM grade WHERE gradeId = ?';
    connection.query(sql, [gradeId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving grade by ID');
        }
        if (results.length > 0) {
            res.render('grade', { grade: results[0] });
        } else {
            res.status(404).send('Grade not found');
        }
    });
});

app.get('/addGrade', (req, res) => {
    res.render('addGrade');
});

app.post('/addGrade', (req, res) => {
    const { module_code, module_name, grade } = req.body;
    const sql = 'INSERT INTO grade (module_code, module_name, grade) VALUES (?,?,?)';
    connection.query(sql, [module_code, module_name, grade], (error, results) => {
        if (error) {
            console.error('Error adding grade:', error.message);
            res.status(500).send('Error adding grade');
        } else {
            res.redirect('/grades');
        }
    });
});

app.get('/editGrade/:id', (req, res) => {
    const gradeId = req.params.id;
    const sql = 'SELECT * FROM grade WHERE gradeId = ?';
    connection.query(sql, [gradeId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving grade by ID');
        }
        if (results.length > 0) {
            res.render('editGrade', { grade: results[0] });
        } else {
            res.status(404).send('Grade not found');
        }
    });
});

app.post('/editGrade/:id', (req, res) => {
    const gradeId = req.params.id;
    const { module_code, module_name, grade } = req.body;
    const sql = 'UPDATE grade SET module_code = ?, module_name = ?, grade = ? WHERE gradeId = ?';
    connection.query(sql, [module_code, module_name, grade, gradeId], (error, results) => {
        if (error) {
            console.error('Error updating grade:', error);
            res.status(500).send('Error updating grade');
        } else {
            res.redirect('/grades');
        }
    });
});

app.get('/deleteGrade/:id', (req, res) => {
    const gradeId = req.params.id;
    const sql = 'DELETE FROM grade WHERE gradeId = ?';
    connection.query(sql, [gradeId], (error, results) => {
        if (error) {
            console.error('Error deleting grade:', error);
            res.status(500).send('Error deleting grade');
        } else {
            res.redirect('/grades');
        }
    });
});

// Routes for Habits
app.get('/habits', (req, res) => {
    const sql = 'SELECT * FROM habits';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving habits');
        }
        res.render('habits', { habits: results });
    });
});

app.get('/addHabit', (req, res) => {
    res.render('addHabit');
});

app.post('/addHabit', (req, res) => {
    const { name, frequency } = req.body;
    const sql = 'INSERT INTO habits (name, frequency) VALUES (?, ?)';
    connection.query(sql, [name, frequency], (error, results) => {
        if (error) {
            console.error('Error adding habit:', error.message);
            return res.status(500).send('Error adding habit');
        }
        res.redirect('/habits');
    });
});

app.get('/updateHabit/:id', (req, res) => {
    const habitId = req.params.id;
    const sql = 'SELECT * FROM habits WHERE habitId = ?';
    connection.query(sql, [habitId], (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving habit');
        }
        res.render('updateHabit', { habit: results[0] });
    });
});

app.post('/updateHabit/:id', (req, res) => {
    const habitId = req.params.id;
    const { name, frequency, last_checked } = req.body;
    const sql = 'UPDATE habits SET name = ?, frequency = ?, last_checked = ? WHERE habitId = ?';
    connection.query(sql, [name, frequency, last_checked, habitId], (error, results) => {
        if (error) {
            console.error('Error updating habit:', error.message);
            return res.status(500).send('Error updating habit');
        }
        res.redirect('/habits');
    });
});

app.get('/deleteHabit/:id', (req, res) => {
    const habitId = req.params.id;
    const sql = 'DELETE FROM habits WHERE habitId = ?';
    connection.query(sql, [habitId], (error, results) => {
        if (error) {
            console.error('Error deleting habit:', error.message);
            return res.status(500).send('Error deleting habit');
        }
        res.redirect('/habits');
    });
});

// Routes for Quotes
app.get('/quotes', (req, res) => {
    const sql = 'SELECT * FROM quotes ORDER BY RAND() LIMIT 1';
    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Database query error:', error.message);
            return res.status(500).send('Error retrieving quote');
        }
        res.render('quotes', { quote: results[0] });
    });
});



// Home route
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
