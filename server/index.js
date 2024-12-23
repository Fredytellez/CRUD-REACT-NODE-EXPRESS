import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import userRoutes from "./routes/users.js";

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

app.use("/", userRoutes);

app.get("/", (req, res) => res.send("Hello from Express"));
app.all("*", (req, res) => res.send("That route doesn't exist "));

app.listen(PORT, () =>
  console.log(`Server is listening on port: http://localhost:${PORT}`)
);
