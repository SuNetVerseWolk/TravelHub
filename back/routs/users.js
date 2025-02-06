const express = require("express"),
  { getData, setData } = require("../getScripts"),
  router = express.Router();

const getUsers = (e) => getData("users");
const setUsers = (data) => setData("users", data);

router.get("/", (req, res) => {
  const users = getUsers();

  res.json(users.map((user) => ({ ...user, password: "" })));
});
router.get("/:id", (req, res) => {
  const users = getUsers(),
    user = users.find((user) => user.id === +req.params.id);

  if (user) return res.json(user);

  res.status(404).json(false);
});

router.post("/book", (req, res) => {
  const users = getUsers();
  const rooms = getData("tours");
  let book = {
      id: Date.now(),
      countPeople: +req.body.countPeople,
      countRooms: +req.body.countRooms,
      comeDate: req.body.comeDate,
      outDate: req.body.outDate,
      price: req.body.price,
    },
    typeRoom = req.body.typeRoom,
    user = users.find((user) => user.number === req.body.number),
    haveUser = !!user;

  if (book.price <= 0) return res.sendStatus(400);

  user = haveUser
    ? user
    : {
        name: req.body.name,
        lastName: req.body.lastName,
        fatherName: req.body.fatherName,
        number: req.body.number,
        email: "",
        password: req.body.number,
        id: Date.now(),
        bookedRooms: [],
      };

  const room = user.bookedRooms.find((room) => room.typeRoom === typeRoom);

  if (!!room) room.books.push(book);
  else user.bookedRooms.push({ typeRoom, books: [book] });

  if (!haveUser) users.push(user);

  const roomType = rooms.find((room) => room.name === typeRoom);
  if (roomType.bookedAmount + book.countRooms > roomType.amount)
    return res.sendStatus(403);
  roomType.bookedAmount = roomType.bookedAmount + book.countRooms;
  setData("rooms", rooms);

  if (setUsers(users)) return res.status(201).json({ id: user.id });

  res.sendStatus(500);
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
  const user = { ...req.body, id: Date.now(), bookedRooms: [] };
  const users = getUsers();

  if (users.findIndex((selfUser) => selfUser.number === user.number) != -1)
    return res.sendStatus(403);

  if (setUsers([...users, user])) return res.status(201).json({ id: user.id });
  res.status(500).json(false);
});
router.post("/:id", (req, res) => {
  const users = getUsers();
  const user = users.find((user) => user.id === +req.params.id);

  if (!user) return res.sendStatus(404);

  Object.keys(req.body).forEach((key) => (user[key] = req.body[key]));

  if (setUsers(users)) return res.sendStatus(201);

  res.sendStatus(500);
});

router.delete("/:id", (req, res) => {
  const users = getUsers(),
    user = users.find((user) => user.id === +req.params.id),
    rooms = getData("rooms");

  user.bookedRooms.forEach((bookedRoom) =>
    bookedRoom.books.forEach((book) => {
      const roomType = rooms.find((room) => room.name === bookedRoom.typeRoom);
      roomType.bookedAmount = roomType.bookedAmount - book.countRooms;
    })
  );

  res.sendStatus(
    setData("rooms", rooms)
      ? setUsers(users.filter((user) => user.id != +req.params.id))
        ? 200
        : 500
      : 500
  );
});
router.delete("/book/:id", (req, res) => {
  const type = req.query.type,
    users = getUsers(),
    user = users.find((user) => user.id === +req.query.userID),
    typeRoom = user.bookedRooms.find((room) => room.typeRoom === type),
    rooms = getData("rooms");

  const roomType = rooms.find((room) => room.name === type);
  roomType.bookedAmount =
    roomType.bookedAmount -
    typeRoom.books.find((room) => room.id === +req.params.id).countRooms;

  typeRoom.books = typeRoom.books.filter((room) => room.id != +req.params.id);
  if (typeRoom.books.length <= 0)
    user.bookedRooms = user.bookedRooms.filter((room) => room.typeRoom != type);

  res.sendStatus(setUsers(users) ? (setData("rooms", rooms) ? 200 : 500) : 500);
});

module.exports = router;
