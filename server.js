const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const product = require("./routes/productRoutes");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());

//Check api working

app.get("/", (req, res) => {
  res.send("API IS RUNNING SUCCESSFULLY");
});

app.use("/api", product);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server Started on ${PORT}`));
