const
express = require('express'),
getData = require('./getData'),
setData = require('./setData'),
router = express.Router();

const getRooms = e => getData('rooms');
const setRooms = data => setData('rooms', data);

router.get('/', (req, res) => {
	const rooms = getRooms();
	
	res.json(rooms)
})
router.get('/:id', (req, res) => {
	const
	rooms = getRooms(),
	room = rooms.find(room => room.id === +req.params.id);

	if (room) return res.json(room)

	res.status(404).json(false);
})
router.delete('/:id', (req, res) => {
	const rooms = getRooms();

	res.sendStatus(setRooms(rooms.filter(room => room.id != +req.params.id)) ? 200 : 500);
})

module.exports = router;