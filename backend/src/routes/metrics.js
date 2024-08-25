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

router.get("/metrics/averages", async (req, res) => {
  try {
    const perMinute = await Metric.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
            hour: { $hour: "$timestamp" },
            minute: { $minute: "$timestamp" },
          },
          averageValue: { $avg: "$value" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const perHour = await Metric.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
            hour: { $hour: "$timestamp" },
          },
          averageValue: { $avg: "$value" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    const perDay = await Metric.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$timestamp" },
            month: { $month: "$timestamp" },
            day: { $dayOfMonth: "$timestamp" },
          },
          averageValue: { $avg: "$value" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: -1 },
      },
    ]);

    res.json({
      perMinute,
      perHour,
      perDay,
    });
  } catch (error) {
    res.status(500).json({ error: "Error calculating averages" });
  }
});

module.exports = router;
