const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const port = process.env.PORT || 3000;

const users = [];

app.use(express.json());

app.post("/register", async(req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = users.find(data => email == data.email);
    if (findUser) {
      res.status(400).send('user is already exist!');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    users.push({ email, password: hashedPassword });
    res.status(201).send("registered successfully!");
  } catch (e) {
    res.status(500).send(e.message);
  }
})

app.post("/login", async (req, res) => {
  try {
     const { email, password } = req.body;
    const findUser = users.find((user) => email == user.email);
    console.log(users);
     if (!findUser) {
      res.status(400).send('wrong email or password!');
    }
    const iscorrect = await bcrypt.compare(password, findUser.password);
    if (iscorrect) {
      res.status(200).send("logged in successfully!!");
    }
  } catch (e) {
     res.status(500).send(e.message);
  }
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})