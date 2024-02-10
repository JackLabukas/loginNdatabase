const express = require("express");
const app = express();
const db = require("../db");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { client } = require("../db");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
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

// app.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);
//     await client.connect();

//     const database = client.db("mytestdb"); // replace 'test' with your database name
//     const users = database.collection("users"); // replace 'users' with your collection name
//     const existingUser = await users.findOne({ username });

//     if (existingUser) {
//       return res.status(400).json({ message: "Username already exists" });
//     }
//     const user = { username, password: hashedPassword };
//     const result = await users.insertOne(user);
//     console.log(
//       `A new user was created with the following id: ${result.insertedId}`
//     );
//     res.json({ message: "User registered successfully" });
//   } finally {
//     await client.close();
//   }
// });

app.use(passport.initialize());

passport.use(
  "register",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      //   const { username, password } = req.body;

      try {
        // Here, you would typically look up the user in your database.
        // For this example, we'll just use a dummy user.
        await client.connect();
        const hashedPassword = await bcrypt.hash(password, 10);
        let user = {
          username,
          password: hashedPassword,
        };
        console.log(user);
        const database = client.db("mytestdb"); // replace 'test' with your database name
        const users = database.collection("users"); // replace 'users' with your collection name
        const existingUser = await users.findOne({ username });
        console.log(existingUser);
        // Check if user already exists
        if (existingUser) {
          return done(null, false, { message: "User already exists" });
        }

        // If user does not exist, hash the password and create a new user
        user = { id: Date.now(), username: username, password: hashedPassword };
        const result = await users.insertOne(user);
        console.log(
          `A new user was created with the following id: ${result.insertedId}`
        );
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

// app.post(
//   "/register",
//   passport.authenticate("register", { session: false }, (req, res) => {
//     res.json({ message: "User registered successfully" });
//     res.redirect("/login");
//   })
// );

app.post("/register", (req, res, next) => {
  passport.authenticate("register", { session: false }, (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An error occurred during registration." });
    }
    if (!user) {
      // If user registration failed, send a JSON response with the message
      return res.status(400).json(info);
    }
    // If user registration succeeded, proceed with the request
    req.logIn(user, { session: false }, (err) => {
      res.json({ message: "User registered successfully" });
      //   res.redirect("/login");
    });
  })(req, res, next);
});
