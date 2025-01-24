import express from "express";
import dotenv from "dotenv";
import pool from "./dbConnection.js";
import cors from "cors";

//  to be able to read enviromental variables
dotenv.config();

const port = process.env.PORT || 8000;

// instance of express
const app = express();

// middlewares
app.use(cors());

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

app.listen(port, () => {
  console.log(`Server running on PORT ${port}`);
});
