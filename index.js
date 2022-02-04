const express = require("express");
const app = express();
const userRoute = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const artistRoutes = require("./routes/artistRoutes");
const authentificationRoutes = require("./routes/authRoutes");
const bodyParser = require("body-parser");
require("./models/dbConfig.js");

app.use(bodyParser.json());
app.use("/users", userRoute);
app.use("/events", eventRoutes);
app.use("/artis", artistRoutes);
app.use("", authentificationRoutes);

app.listen(process.env.PORT || 8000, () => console.log("server started"));


