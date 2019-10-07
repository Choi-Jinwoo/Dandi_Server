require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const origin = require('./middleware/origin'); //middleware
const colorConsole = require('./lib/console');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(origin);

app.use('/static', express.static(__dirname + '/public'));

app.use('/', require('./api'));

//redirect api docs
app.get('/api', (req, res) => {
  res.redirect(
    'https://b1nd-4th.gitbook.io/dandi-api/?fbclid=IwAR2ejEuhKJh_xDqvJ0-kHZMcJCSHj0wT6uWJou7s4RYlCvGC8FeOrIVmeQY'
  );
});

app.listen(5000, () => {
  colorConsole.green(`server is running at port 5000`);
});
