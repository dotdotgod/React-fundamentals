import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";

import user from "./routes/user";
const app = express();

const myLogger = (req, res, next) => {
  console.log(req.url);
  next();
};

//Logging middleware
app.use(
  morgan(":method :url :status :response-time ms - :res[content-length]")
);
// app.use(myLogger);

app.use(bodyParser.json());

app.use("/", express.static("public"));

app.use("/user", user);

app.listen(3000, () => {
  console.log("Example App listening on port 3000");
});
