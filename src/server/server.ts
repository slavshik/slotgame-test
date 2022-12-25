import express from "express";
import cors from "cors";
import * as config from "./server-config.json";
import {SpinAction} from "./spin/SpinAction";

const port = 3000;
const app = express();

app.use(cors());
const spinAction = new SpinAction(config.spin);
app.post("/spin", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = spinAction.run();
    res.send(JSON.stringify(result));
});
app.post("/spin/bonus", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = spinAction.run({bonusGame: true});
    res.send(JSON.stringify(result));
});
app.listen(port);
