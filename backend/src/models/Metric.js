const mongoose = require("mongoose");

const metricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

const Metric = mongoose.model("Metric", metricSchema);
module.exports = Metric;
