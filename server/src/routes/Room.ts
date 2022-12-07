import express from "express";
import {
  create_room_controller,
  find_user,
} from "../controller/RoomController";
const router = express.Router();

router.post("/create", create_room_controller);
router.post("/find", find_user);

export default router;
