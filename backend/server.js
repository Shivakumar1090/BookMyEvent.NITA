const express = require("express");
const cors = require("cors");
const bodyparser=require('body-parser');
const ConnectDB = require('./config/dbconnect');

const app = express();

require("dotenv").config();
const port = process.env.PORT || 3002;

// images
app.use(express.static("./uploads"));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//json
app.use(express.json({ extended: false }));
app.use(cors());

// body parser middleware
app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());

// Mongoose Database connection
ConnectDB();

// //Routes
const UserRoute = require('./routes/User');
const EventRoutes = require('./routes/Event');
const PaymentRountes = require('./routes/Payment');

app.use('/events' , EventRoutes);
app.use('/user', UserRoute);
app.use('/amount' , PaymentRountes);

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
