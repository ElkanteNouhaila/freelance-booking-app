import express from "express";
import { verifyToken, authorizeRole } from "../middlewares/auth.middlewares.js";
import { bookService } from "../controllers/booking.controller.js";

const router = express.Router();

router.post(
  "/book-service",
  verifyToken,
  authorizeRole("client"),
  bookService
);

export default router;
