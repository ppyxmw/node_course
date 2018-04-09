const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  console.log(log);
  fs.appendFile('server_log', log + '\n', (err) => {
    if (err) {
      console.log(`Unable to append to server_log.`);
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () =>{
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

// app.get('/', (req, res) => {
//   // res.send('<h1>Hello Expres!</h1>');
//   res.send({
//     name: 'Michael',
//     likes: [
//       'biking',
//       'Juice'
//       ]
//   });
// });

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: `Welcome to the world's best page`
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    Status: '404 error',
    information: 'This is just a sample to show JSON.' 
  });
});

app.listen(8080, () => {
  console.log('Server is up on port 8080.')
});