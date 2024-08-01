require('dotenv').config();
const { Title } = require('chart.js');
const express=require('express');
const methodOverride=require('method-override');
const expressLayouts=require('express-ejs-layouts')
const connectDB=require('./server/config/db')
const session =require('express-session') 
const passport=require('passport');
const MongoStore=require('connect-mongo');
const app=express();

const port=5000|| process.env.PORT;


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URL
    }),
    
  }));
  
app.use(passport.initialize());
app.use(passport.session());

//create a form ->helps us pass the data
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride("_method"));

connectDB();
//static files
app.use(express.static('public')); 

//templating
app.use(expressLayouts);
app.set('layout','./layouts/main');
app.set('view engine','ejs');

//ROUTES

app.use('/',require('./server/routes/index.js'))
app.use('/',require('./server/routes/dashboard.js'))
app.use('/',require('./server/routes/auth.js'))


//ahndel random routes
app.get('*', (req, res)=> {
    //res.status(404).send('404 Page Not Found.')
    res.status(404).render('404');
  })

app.listen(port,()=>{
    console.log(`App listening on port ${port}`);
})