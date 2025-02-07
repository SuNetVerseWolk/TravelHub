require('dotenv').config();

const
port = process.env.PORT || 3002,
express = require('express'),
cors = require('cors'),
path = require('path'),
app = express(),
{ users, tours } = require('./getRouts'),
corsOptions = {
  origin: ['http://localhost:5173', 'https://travel-hub-lyart.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));
app.use('/imgs', express.static(path.join(__dirname, 'data', 'imgs')));

app.use('/users', users);
app.use('/tours', tours);

app.listen(port, e => console.log(`Запущено!!!`));