const mongoose = require('mongoose');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const path = require('path');

const uri = 'mongodb+srv://codewithadarsh:adarsh569@sdeadarsh569.rfwjqwt.mongodb.net/company_data_demo?retryWrites=true&w=majority';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: true
}));

function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login.html');
}


const userSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', userSchema);

// Company schema and model
const companySchema = new mongoose.Schema({
    entity: String,
    sector: String,
    email: String,
    incorporation: String,
    address: String,
    revenue: Number,
    website: String,
    is_verified: Boolean
});

const Company = mongoose.model('Company', companySchema);

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.redirect('/login.html?error=1');
        }
    } catch (err) {
        res.status(500).send('Error occurred');
    }
});


app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login.html');
});

// Get company data (API endpoint)
app.get('/api/companies', isAuthenticated, async (req, res) => {
    try {
        const search = req.query.search || '';
        const companies = await Company.find({
            $or: [
                { entity: new RegExp(search, 'i') },
                { sector: new RegExp(search, 'i') },
                { email: new RegExp(search, 'i') },
                { incorporation: new RegExp(search, 'i') },
                { address: new RegExp(search, 'i') },
                { website: new RegExp(search, 'i') }
            ]
        });
        res.json(companies);
    } catch (err) {
        res.status(500).send('Error occurred');
    }
});

app.get('/is-authenticated', (req, res) => {
    res.json({ authenticated: !!req.session.user });
});



app.get('/', isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});

