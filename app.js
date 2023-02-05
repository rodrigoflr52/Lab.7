let express = require("express");
let path = require("path");
let mongoose = require("mongoose");
let morgan = require("morgan");
let dotenv = require("dotenv");

dotenv.config();

const app = express();


app.get("/", function(req,res){
    res.send("Bienvenidrr")
})

// connection to db

mongoose.connect(process.env.MONGODB)
    .then(db => console.log('db connected'))
    .catch(err => console.log(err))
// importing routes
const indexRoutes = require('./routes/routeindex');


// settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));


// routes
app.use('/', indexRoutes);

app.listen(app.get('port'), function(){
    console.log(`server on port ${app.get('port')}`);
})

