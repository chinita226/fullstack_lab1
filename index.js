const express = require('express')

const mongoose = require('mongoose');
//connection url
const app = express()
const dotenv = require('dotenv');

const pages = require('./routes/routes');

dotenv.config();

//connect to mongo DB
//connection()

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true, useNewUrlParser: true }, ()=>{
    console.log('Connected to the whole world with my Database!');
});

app.use(express.json());
app.use(express.static('view'));


app.use('/api', pages);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on  ${process.env.PORT}`)
})



