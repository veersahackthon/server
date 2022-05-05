const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
//admin
const ip = require('./routes/admin/user/ip');

//passport
require('./passport');
const cookieSession = require('cookie-session');
const passport = require('passport');

// shop
const productRoute = require('./routes/Shop Routes/product');
const cartRoute = require('./routes/Shop Routes/cart');
const orderRoute = require('./routes/Shop Routes/order');
const maincarRoute = require('./routes/Shop Routes/MainCara');

// blog
const blogRoute = require('./routes/blog');
const cors = require('cors');

// flash
const flash = require('connect-flash');
const customMware = require('./config/middleware');

dotenv.config();

// mongo db
dotenv.config();
mongoose
  .connect(process.env.Mongoose_url)
  .then(() => console.log('DB connection successful'))
  .catch((err) => {
    console.log(err);
  });

app.use(
  cookieSession({
    name: 'session',
    keys: ['hello'],
    maxAge: 30 * 24 * 60 * 60 * 100,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// json data allow
app.use(express.json({ limit: '50mb' }));

// cross site verification
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// app.use(flash());
// app.use(customMware.setFlash);

// Routes
// user routes
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);

// blog routes
app.use('/api/blog', blogRoute);

// shop routes
app.use('/api/cart', cartRoute);
app.use('/api/order', orderRoute);
app.use('/api/products', productRoute);
app.use('/api/maincar', maincarRoute);

app.use('/api/', ip);
// run on port
const port = 5000;
app.listen(port, () => {
  console.log('server is running on port', port);
});

// note: products categories are = featuredproducts , flashsale , moreforyou , toprated , bigdiscount , newarrival
