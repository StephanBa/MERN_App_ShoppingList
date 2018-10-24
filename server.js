const express = require('express');
const mongoose = require('mongoose');
// const bodyParser = require('body-parser'); not needed anymore as Express has added the express.json() to express which is a built-in replacement for the body-parser middleware
const path = require('path');

const items = require('./routes/api/items');

const app = express();

// Bodyparser MiddleWare
app.use(express.json());

//DB config 
const db = require('./config/keys').mongoURI;

// Connect to Mongo
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('mongo DB Connected...'))
    .catch(err => console.log(err));
    
// Use Routes
app.use('/api/items', items);

// Serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
