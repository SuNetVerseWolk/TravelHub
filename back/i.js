require('dotenv').config();

const
port = process.env.PORT || 3002,
express = require('express'),
cors = require('cors'),
app = express(),
{ users, tours } = require('./getRouts')

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use('/users', users);
app.use('/tours', tours);

app.listen(port, e => console.log(`Запущено!!!`));