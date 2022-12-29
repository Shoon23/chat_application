import express from "express";
import {
  create_room_controller,
  find_user,
  inbox_controller,
} from "../controller/RoomController";
const router = express.Router();

router.post("/create", create_room_controller);
router.post("/find", find_user);
router.get("/inbox/:user_id", inbox_controller);

export default router;
