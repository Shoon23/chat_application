import express from "express";
import {
  get_all_message,
  send_controller,
} from "../controller/MessageController";
const router = express.Router();

router.post("/send", send_controller);
router.post("/get-all", get_all_message);
export default router;
