const
express = require('express'),
{ getData, setData } = require('../getScripts'),
router = express.Router();

const getTours = e => getData('tours');
const setTours = data => setData('tours', data);

router.get('/', (req, res) => {
	const tours = getTours();
	
	res.json(tours)
})
router.get('/:id', (req, res) => {
	const
	tours = getTours(),
	tour = tours.find(tour => tour.id === +req.params.id);

	if (tour) return res.json(tour)

	res.status(404).json(false);
})
router.delete('/:id', (req, res) => {
	const tours = getTours();

	res.sendStatus(setTours(tours.filter(tour => tour.id != +req.params.id)) ? 200 : 500);
})

module.exports = router;