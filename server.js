const express = require('express');
const connectToMongoose = require('./mongoose/db');
const DBCONNECTION = require('./mongoose/db')
const PORT = process.env.PORT || 3000;

const app = express();

//Connect to DB
connectToMongoose();

//Middleware
app.use(express.json({ extended: false }));

//Route endpoints
        //URL path            export Filepath
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));


app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log("listening on port " + PORT));