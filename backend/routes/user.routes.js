import express from "express";
// controllers will be added later
// import { registerUser, loginUser } from "../controllers/user.controller.js";

const router = express.Router();

router.post("/register", (req, res) => {
  res.send("register user");
});

router.post("/login", (req, res) => {
  res.send("login user");
});

export default router;
