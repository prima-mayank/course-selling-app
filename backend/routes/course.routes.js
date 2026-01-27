import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/rbac.middleware.js";
// import controllers later

const router = express.Router();

// PUBLIC
router.get("/", (req, res) => {
  res.send("get all courses");
});

router.get("/:id", (req, res) => {
  res.send("get single course");
});

// ADMIN ONLY
router.post(
  "/",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.send("create course");
  }
);

router.patch(
  "/:id/publish",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.send("publish course");
  }
);

export default router;
