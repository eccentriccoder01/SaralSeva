import express from "express";
import { getHealth } from "../monitor/monitorP1.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send({
        message: "Server Health OK ✅",
        ...getHealth()
    });
});

export default router;