const express = require("express")
const KPI = require("../models/KPI.js")
const kpis = require("../data/data.js")

const router = express.Router();

router.get("/kpis", async (req, res) => {
    try {
        const data = kpis
        res.status(200).json(data)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
})


module.exports = router;