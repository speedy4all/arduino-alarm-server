const functions = require("firebase-functions");

const express = require("express");
const app = express();
const port = 4000;
const host = process.env.HOST || "localhost";
const utils = require("./utils");

app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on ${host}:${port}`);
});

app.get("/", async (req, res) => {
  res.send("App is on");
});

app.get("/ping", async (req, res) => {
  res.send("Pong");
});

app.post("/status", async (req, res) => {
    const data = await utils.writeFile('data.json', req.body);
    res.send(data);
});

app.get("/status", async (req, res) => {
    const data = await utils.readFile('data.json');
    res.send(data);
});

app.get("/users", async (req, res) => {
    const users = await utils.readFile('users.json');
    const admin = users.find((u) => u.username === "admin");

    res.send(admin);
});

exports.app = functions.https.onRequest(app);
