
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import path from "path";

const dirname = path.dirname(new URL(import.meta.url).pathname);
let app = express();
app.use(logger("dev"));
app.set("views", dirname);
app.use(express.static(path.join(dirname, "../../public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("*", (req, res) => {
  res.write("testing");
  res.send();
});

app.listen(8080);