require('./src/config');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./src/app/routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));
app.use(routes);

const server = app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on ' + server.address().port);
});
