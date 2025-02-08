const convertBase64ToImage = require("../scripts/upload");

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
    tour = tours.find((tour) => tour.id === +req.params.id),
    isNew = req.params.id === "new";

  if (!isNew && !tour) return res.sendStatus(404);
  if (!Object.keys(req.body).find(value => value === 'id')) return res.sendStatus(400);

  req.body.imgs.forEach((imgSrc, index) => {
    if (imgSrc.startsWith("data:")) {
      let convertedFilename = convertBase64ToImage(imgSrc, req.body.id);

      if (convertedFilename) {
        req.body.imgs[index] = convertedFilename;
      }
    }
  });

  res.sendStatus(
    setTours(
      isNew
        ? [...tours, req.body]
        : tours.map((item) => (item.id === tour.id ? req.body : item))
    )
      ? 200
      : 500
  );
});
router.delete("/:id", (req, res) => {
  const tours = getTours();

  res.sendStatus(
    setTours(tours.filter((tour) => tour.id != +req.params.id)) ? 200 : 500
  );
});

module.exports = router;
