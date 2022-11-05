const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const router = require("./Routes/v1/index");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();
app.get("/", (req, res) => {
  res.send("Hello this is server...");
});

app.use("/v1", router);

PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
