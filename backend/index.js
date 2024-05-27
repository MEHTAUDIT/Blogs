const express = require('express');
const app = express();
const PORT=8000;
const connectToMongoDB = require('./connect');
const authRoutes = require('./routes/auth');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const BlogRoutes = require('./routes/blog');
const cors = require('cors');

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

connectToMongoDB("mongodb://127.0.0.1:27017/blog")

app.use("/",authRoutes);
app.use("/blog",BlogRoutes);