import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import authorizeRoles from "../middleware/rbac.middleware.js";
// import controllers later

const router = express.Router();

// PUBLIC
router.get("/:courseId", (req, res) => {
  res.send("get course lectures");
});

// ADMIN ONLY
router.post(
  "/:courseId",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.send("add lecture");
  }
);

router.delete(
  "/:lectureId",
  authMiddleware,
  authorizeRoles("admin"),
  (req, res) => {
    res.send("delete lecture");
  }
);

export default router;
