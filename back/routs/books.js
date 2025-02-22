const express = require("express"),
  { getData, setData } = require("../getScripts"),
  router = express.Router();

const getBooks = () => getData("books");
const getTours = () => getData("tours");
const setBooks = (data) => setData("books", data);
const setTours = (data) => setData("tours", data);

router.get("/", (req, res) => res.json(getBooks()));
router.get("/:id", (req, res) => {
  const books = getBooks(),
    book = books.find((book) => book.id === +req.params.id);

  if (book) return res.json(book);

  res.status(404).json(false);
});

router.post("/book", (req, res) => {
  const allFieldsPresent = [
    req.body?.userId,
    req.body?.tourId,
    req.body?.countAdults,
    req.body?.countChildren,
    req.body?.price,
  ].every((field) => field !== null && field !== undefined);

  if (!allFieldsPresent) {
    const requiredFields = [
      "userId",
      "tourId",
      "countAdults",
      "countChildren",
      "price",
    ];
    const missingFields = requiredFields.filter((field) => !req.body?.[field]);

    return res.status(400).json({
      error: "Missing required fields",
      details: missingFields,
    });
  }

  let books = getBooks(),
    tours = getTours(),
    isEnough = true;

  books = [...books, { id: Date.now(), ...req.body }];
  const tour = tours.find((tour) => tour.id === req.body.tourId);

  if (!tour) {
    return res.status(404).json(false);
  }

  tour.leftAmount =
    (tour?.leftAmount >= 0 ? tour?.leftAmount : tour.maxAmount) -
    (+req.body.countAdults + +req.body.countChildren);

  res.sendStatus(
    tour.leftAmount >= 0 ? (setBooks(books) && setTours(tours) ? 200 : 500) : 409
  );
});
//router.post("/:id", (req, res) => {
//  let books = getBooks();
//  const book = books.find((book) => book.id === +req.params.id);

//  if (!book) return res.sendStatus(404);
//  console.log(req.body);
//  books = books.map((book) =>
//    book.id === +req.params.id ? { ...book, ...req.body } : book
//  );

//  res.sendStatus(setBooks(books) ? 201 : 500);
//});

router.delete("/:id", (req, res) => {
  let books = getBooks();
  const id = +req.params.id,
    book = books.find((book) => book.id === id);
  if (!book) res.sendStatus(404);

  let tours = getTours();
  tours = tours.map((tour) =>
    tour.id == book.tourId
      ? {
          ...tour,
          leftAmount: tour.leftAmount + book.countAdults + book.countChildren,
        }
      : tour
  );

  books = getBooks().filter((book) => book.id != id);

  res.sendStatus(setTours(tours) && setBooks(books) ? 200 : 500);
});

module.exports = router;
