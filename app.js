var express = require('express')
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
var compression = require('compression')

var homeController = require('./controllers/home')

var app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
// app.use(cookieParser())

// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/build'));

app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('view cache', true);

var router = express.Router();

router.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,x-access-token,cust");
  // res.setHeader('Access-Control-Allow-Methods', config.allowMethods);
  next();
});


  router.route('/')
  .get(homeController.getHomePage);


  app.use(router);


// Error Middleware
app.use(function(err, req, res, next) {

  console.log(req.originalUrl);
  console.log(err);

  err.status = (err.status || 500)

  if (req.accepts('html')) {
    console.log("Rendering Error page");
    res.render('home/error',{error:err} );
    return;
  }

  if (req.accepts('json')) {
    console.log("Sending json");
    res.status(err.status).json({ error: err });
    return;
  }
  console.log("Sending plan text");
  res.type('txt').send(err);
});

var server_port = process.env.NODEJS_PORT || 3000
var server_ip_address = process.env.NODEJS_IP || '0.0.0.0'

app.listen(server_port,server_ip_address, function(){
  console.log("Listening on " + server_ip_address + ", server_port " + server_port)
});

process.on('uncaughtException', function(err) {
  console.log("Inside global catch");
  console.error(err);
});
