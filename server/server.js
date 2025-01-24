import express from "express";
import dotenv from "dotenv";
import pool from "./dbConnection.js";
import cors from "cors";
// unique identifier
import { v4 as uuidv4 } from "uuid";

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
      [user_email, title, progress, date]
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
