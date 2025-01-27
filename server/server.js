import express from "express";
import dotenv from "dotenv";
import pool from "./dbConnection.js";
import cors from "cors";
// unique identifier
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//  to be able to read enviromental variables
dotenv.config();

const port = process.env.PORT || 8000;

// instance of express
const app = express();

// middlewares
app.use(cors());
app.use(express.json());

//Routes
// get all todos
app.get("/api/todos/:userEmail", async (req, res) => {
  const userEmail = req.params.userEmail;

  try {
    const todos = await pool.query(
      "SELECT * FROM todos WHERE user_email = $1",
      [userEmail]
    );
    return res.status(200).json(todos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// create or post a todo
app.post("/api/todos", async (req, res) => {
  // missing data validation

  const { user_email, title, progress, date } = req.body;

  console.log(user_email, title, progress, date);

  const id = uuidv4();

  try {
    const newTodo = await pool.query(
      "INSERT INTO todos (id, user_email, title, progress, date) VALUES($1,$2,$3,$4,$5)",
      [id, user_email, title, progress, date]
    );

    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error.message);
  }
});

// update a todo endpoint
app.put("/api/todos/:id", async (req, res) => {
  const id = req.params.id;

  const { user_email, title, progress, date } = req.body;

  try {
    const response = await pool.query(
      "UPDATE todos SET user_email = $1, title=$2, progress=$3, date=$4 WHERE id= $5;",
      [user_email, title, progress, date, id]
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
});

// route to delete a todo by id
app.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const response = await pool.query("DELETE FROM todos WHERE id=$1", [id]);
    return res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
});

// signup route
app.post("/api/user/register", async (req, res) => {
  const { email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const register = await pool.query(
      `INSERT INTO users (email, hashed_password) VALUES($1,$2)`,
      [email, hashPassword]
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });
    res.json({ email, token });
  } catch (error) {
    console.error(error.message);
    if (error) {
      res.json({ details: error.detail });
    }
  }
});

//login route
app.post("/api/user/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (users.rowCount === 0) {
      return res.json({ detail: "user does not exist " });
    }

    const success = await bcrypt.compare(
      password,
      users.rows[0].hashed_password
    );

    const token = jwt.sign({ email }, "secret", { expiresIn: "1hr" });

    if (success) {
      return res.json({ email: users.rows[0].email, token });
    } else {
      return res.json({ detail: "Login failed" });
    }
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
