import express from "express";
import { send_controller } from "../controller/MessageController";
const router = express.Router();

router.get("/send", send_controller);

export default router;
