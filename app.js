require('dotenv').config();
const express      = require('express');
const app = express();
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose     = require('mongoose');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const cors = require('cors');
const logger       = require('morgan');
const path         = require('path');
const session       = require('express-session');
const passport      = require('passport');
require('./configs/passport');



mongoose
  .connect('mongodb://localhost/project-management-server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;




// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "./public/index.html");
});

// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

//  SESSION SETTINGS HERE:
app.use(session({
  secret:"some secret goes here",
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.locals.title = 'Express ';


// ADD CORS SETTINGS HERE TO ALLOW CROSS-ORIGIN INTERACTION:

app.use(cors({
  credentials: true,
  origin: ['http://localhost:3000'] // <== URL of our React app 
}));


// ROUTES MIDDLEWARE STARTS HERE:

const index = require('./routes/index');
app.use('/', index);
const AuthRoutes = require('./routes/AuthRoutes');
app.use('/auth', AuthRoutes);
const TripRoutes = require('./routes/TripRoutes');
app.use('/trip', TripRoutes);

app.use('/api', require('./routes/PicUpload'));

module.exports = app;
