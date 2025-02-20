const express = require("express"),
  {
    getUsers,
    setUsers,
    getBooks,
    getTours,
    setBooks,
    setTours,
  } = require("../getScripts"),
  router = express.Router();

router.get("/", (req, res) => {
  const users = getUsers();

  res.json(
    users.map((user) => {
      let { password, ...data } = user;

      return data;
    })
  );
});
router.get("/:id", (req, res) => {
	if (!req.params.id) return res.status(400).json({ message: "Missing id" });

  const users = getUsers(),
    user = users.find((user) => user.id === +req.params.id);

  if (user) return res.json(user);

  res.status(404).json(false);
});

router.post("/logIn", (req, res) => {
  if (
    req.body.number === process.env.ADMIN_NAME &&
    req.body.password === process.env.ADMIN_PASSWORD
  )
    return res.json({ id: process.env.ADMIN_ID, type: "admin" });

  const users = getUsers();
  let user = users.find((user) => user.number === req.body.number);

  if (!user) return res.sendStatus(404);

  const { id, password } = user;
  if (password != req.body.password) return res.sendStatus(403);

  res.json({ id });
});
router.post("/signUp", (req, res) => {
  const bodyKeys = Object.keys(req.body);

  if (
    !(
      bodyKeys.includes("name") &&
      bodyKeys.includes("lastName") &&
      bodyKeys.includes("fatherName") &&
      bodyKeys.includes("number") &&
      bodyKeys.includes("password") &&
      bodyKeys.includes("email")
    )
  ) {
    return res.status(400).json(false);
  }
  const user = { ...req.body, id: Date.now() };
  const users = getUsers();

  if (users.findIndex((selfUser) => selfUser.number === user.number) != -1)
    return res.sendStatus(403);

  if (setUsers([...users, user])) return res.status(201).json({ id: user.id });
  res.status(500).json(false);
});
router.post("/:id", (req, res) => {
  let users = getUsers();
  const user = users.find((user) => user.id === +req.params.id);

  if (!user) return res.sendStatus(404);
  console.log(req.body);
  users = users.map((user) =>
    user.id === +req.params.id ? { ...user, ...req.body } : user
  );

  res.sendStatus(setUsers(users) ? 201 : 500);
});

router.delete("/:id", (req, res) => {
  const users = getUsers(),
    id = +req.params.id,
    user = users.find((user) => user.id === id);

  if (!user) {
    return res.sendStatus(404);
  }
  const tours = getTours();
  let books = getBooks();

  books.forEach((book) => {
    if (book.userId == id) {
      const tour = tours.find((tour) => tour.id == book.tourId);

      tour.leftAmount += +book.countAdults + +book.countChildren;
    }
  });
  books = books.filter((book) => book.userId != id);

  res.sendStatus(
    setTours(tours)
      ? setBooks(books)
        ? setUsers(users.filter((user) => user.id != id))
          ? 200
          : 500
        : 500
      : 500
  );
});

module.exports = router;
