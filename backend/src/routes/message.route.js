import express from "express";
import { getAllContacts, getMessagesByUserId, sendMessage, getChatPartners } from "../controllers/message.controller.js";
import { protectRoute } from "../lib/middleware/auth.middleware.js";
import { arcjetMiddleware } from "../lib/middleware/arcjet.middleware.js";
import arcjet from "@arcjet/node";
const router = express.Router();


router.use(arcjetMiddleware, protectRoute);
router.get("/contacts", protectRoute, getAllContacts);
router.get("/chats", protectRoute, getChatPartners);
router.get("/:id", protectRoute, getMessagesByUserId);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
