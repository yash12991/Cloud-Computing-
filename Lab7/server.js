const express = require("express");
const client = require("prom-client");

const app = express();
const port = 3000;

// GPS location of classroom (example)
const gpsData = {
    latitude: 12.9716,
    longitude: 77.5946,
    classroom: "CS Lab"
};

// Prometheus metrics
const register = new client.Registry();
client.collectDefaultMetrics({ register });

app.get("/gps", (req, res) => {
    res.json(gpsData);
});

// Prometheus metrics endpoint
app.get("/metrics", async (req, res) => {
    res.set("Content-Type", register.contentType);
    res.end(await register.metrics());
});

app.listen(port, () => {
    console.log(`GPS Microservice running on port ${port}`);
});