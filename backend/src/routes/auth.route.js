import express from "express";
import { signup, login, logout, updateProfile } from "../controllers/auth.controller.js";
import { protectRoute } from "../lib/middleware/auth.middleware.js";
import { arcjetMiddleware } from "../lib/middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetMiddleware);
 

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);

router.get(
  "/check",
  protectRoute,
  (req, res) => res.status(200).json(req.user)
);

export default router;
