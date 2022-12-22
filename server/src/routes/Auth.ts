import express from "express";
import {
  login_controller,
  register_controller,
  refresh_controller,
} from "../controller/AuthController";
const router = express.Router();

router.post("/login", login_controller);
router.post("/register", register_controller);
router.get("/refresh", refresh_controller);

export default router;
