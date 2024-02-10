const express = require("express");
const app = express();
const db = require("../db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { client } = require("../db");
app.use(cors());

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // only allow requests from this origin
  })
);
db.connect()
  .then(() => {
    app.listen(3001, () => {
      console.log("App is listening on port 3001");
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    await client.connect();

    const database = client.db("mytestdb"); // replace 'test' with your database name
    const users = database.collection("users"); // replace 'users' with your collection name
    const existingUser = await users.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }
    const user = { username, password: hashedPassword };
    const result = await users.insertOne(user);
    console.log(
      `A new user was created with the following id: ${result.insertedId}`
    );
    res.json({ message: "User registered successfully" });
  } finally {
    await client.close();
  }
});
