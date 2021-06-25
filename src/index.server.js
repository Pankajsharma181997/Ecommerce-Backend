const express = require("express");
const env = require("dotenv")
const bodyParser = require("body-parser")
const mongoose = require('mongoose');

//Routes
const userRoutes = require('./routes/admin/auth');
const adminRoutes = require('./routes/admin/auth');

const app = express();

//ENVIRONMENT
env.config();

app.use(bodyParser());

//MongoDB Connection
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@pankaj.jokoj.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
    {useNewUrlParser: true,
     useUnifiedTopology: true,
     useCreateIndex: true
    }
     ).then(() => {
         console.log("Connected to mongodb..")
     });

app.use('/api',userRoutes);

app.use('/api/admin',adminRoutes);

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})