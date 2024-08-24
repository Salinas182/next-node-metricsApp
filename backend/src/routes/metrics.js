const express = require("express");
const Metric = require("../models/Metric");

const router = express.Router();

router.post("/metrics", async (req, res) => {
  const { name, value } = req.body;
  const metric = new Metric({ name, value });

  try {
    await metric.save();
    res.status(201).send(metric);
  } catch (error) {
    console.error("Error adding metric:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/metrics", async (req, res) => {
  try {
    const metrics = await Metric.find();
    res.send(metrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
