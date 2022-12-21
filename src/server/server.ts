import express from "express";
import cors from "cors";
import { GameOutcome } from "../shared/GameOutcome";

const port = 3000;
const app = express();

app.use(cors());
app.post('/spin', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result: GameOutcome = { result: 1 }
    res.send(JSON.stringify(result));
});
app.listen(port);

