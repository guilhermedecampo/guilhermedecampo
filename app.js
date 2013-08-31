var express = require('express'),
    path = require('path'),
    http = require('http');

var app = express();

app.configure(function () {
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', __dirname + '/views');
    app.engine('jade', require('jade').__express);
});


app.get('/', function (req, res){
  res.render('index.jade')
});

 app.get('/works', function (req, res){
  res.render('works.jade')
});

  app.get('/ideas', function (req, res){
  res.render('ideas.jade')
});


app.use(function (err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack)

      // error page
      res.status(500).render('index.jade')

});

    // assume 404 since no middleware responded
app.use(function (req, res, next){
    res.status(404).render('index.jade')

});

app.listen(1500);
