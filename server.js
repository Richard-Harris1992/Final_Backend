require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => res.send('api running'));

app.listen(PORT, () => console.log("listening on port " + PORT));