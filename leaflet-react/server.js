var express = require('express');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));


app.get('/', function (req, res) {
  res.render('index');
});

app.get('/connectData', function (req, res) {
  res.send();
});

app.listen(8080, function () {
  console.log("Server listening on port 80");
});
