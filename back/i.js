require('dotenv').config();

const
port = process.env.PORT || 3002,
express = require('express'),
cors = require('cors'),
app = express(),
dataPaths = {
	users: 'users',
	rooms: 'rooms',
},
{ users, rooms } = require('./getRouts')

app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use('/' + dataPaths.users, users);
app.use('/' + dataPaths.rooms, rooms);

app.listen(port, e => console.log(`Запущено!!!`));