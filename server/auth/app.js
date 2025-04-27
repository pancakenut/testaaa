const express = require("express");
const bodyParser = require("body-parser");
const cors = require("../middleware/cors");
const { ALLOW_ORIGINS } = require("../config");
const router = require("./middleware/router");

const app = express();
app.use(bodyParser.json());
app.use(cors(ALLOW_ORIGINS));
app.use(router(app));
app.listen(5500, () => {
  console.log("Server is running on http://localhost:5500");
});
