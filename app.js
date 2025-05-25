const express = require('express');
const path = require('path');
const app = express();
const port = 5500;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/viewData');
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'register.html'));
})

app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'about.html'));
})

app.get('/addData', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'addData.html'));
})

app.get('/addDataMenu', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'addDataMenu.html'));
})

app.get('/adminViewData', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'adminViewData.html'));
})

app.get('/adminViewDataMenu', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'adminViewDataMenu.html'));
})

app.get('/editData', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'editData.html'));
})

app.get('/viewData', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'viewData.html'));
})

app.get('/viewDataMenu', (req, res) => {
    res.sendFile(path.join(__dirname,'public', 'views', 'viewDataMenu.html'));
})

// Start the server
app.listen(port, () => {
  console.log(`App running at http://103.75.25.77:${port}`);
});
