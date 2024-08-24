require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const metricsRoutes = require("./routes/metrics");

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({
  credentials: true,
  origin: [process.env.FRONT]
}));
app.use(express.json());

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PWD}@metricsdb.269b1.mongodb.net/?retryWrites=true&w=majority&appName=MetricsDB`
  )
  .then(() => console.log("Connected to Metrics DB"))
  .catch((err) => console.error(err));

app.use(metricsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
