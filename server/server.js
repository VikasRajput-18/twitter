import express from "express";
import { config } from "dotenv";
import cors from "cors";
import connection from "./connection/connection.js";
import authRouter from "./routes/auth.js";
import tweetRouter from "./routes/tweet.js";
import bodyParser from "body-parser";

config();
const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
  })
);
app.use("/", authRouter);
app.use("/api", tweetRouter);

connection();

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
