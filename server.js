const express = require("express");
const cors = require("cors");
const connectDB = require("./Config/db");
const indexRouter = require("./Routes");

const app = express();

app.use(express.json());
app.use(cors());
connectDB();

app.use("api/", indexRouter);

PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
