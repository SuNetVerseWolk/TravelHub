const express = require("express"),
  { getData, setData } = require("../getScripts"),
  router = express.Router();

const getTours = (e) => getData("tours");
const setTours = (data) => setData("tours", data);

router.get("/", (req, res) => {
  const tours = getTours();

  res.json(tours);
});
router.get("/:id", (req, res) => {
  const tours = getTours(),
    tour = tours.find((tour) => tour.id === +req.params.id);

  if (tour) return res.json(tour);

  res.status(404).json(false);
});
router.post("/:id", (req, res) => {
  const tours = getTours(),
    tour = tours.find((tour) => tour.id === +req.params.id);

  if (!tour) return res.sendStatus(404);
	if (!req.body) return res.sendStatus(400);

	res.sendStatus(setTours(tours.map(item => item.id === tour.id ? req.body : item)) ? 200 : 500);
});
router.delete("/:id", (req, res) => {
  const tours = getTours();

  res.sendStatus(
    setTours(tours.filter((tour) => tour.id != +req.params.id)) ? 200 : 500
  );
});

module.exports = router;
