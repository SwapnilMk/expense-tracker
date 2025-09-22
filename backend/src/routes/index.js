import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "expense manager app starting now !!" });
});

export default router;
