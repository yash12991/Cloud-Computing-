// const express = require("express");
// const client = require("prom-client");

// const app = express();
// const port = 3000;

// // GPS location of classroom (example)
// const gpsData = {
//     latitude: 12.9716,
//     longitude: 77.5946,
//     classroom: "CS Lab"
// };

// // Prometheus metrics
// const register = new client.Registry();
// client.collectDefaultMetrics({ register });

// app.get("/gps", (req, res) => {
//     res.json(gpsData);
// });

// // Prometheus metrics endpoint
// app.get("/metrics", async (req, res) => {
//     res.set("Content-Type", register.contentType);
//     res.end(await register.metrics());
// });

// app.listen(port, () => {
//     console.log(`GPS Microservice running on port ${port}`);
// });
const express = require("express");

const app = express();
const port = 3000;

let classroomLocation = {
    latitude: null,
    longitude: null
};

// API to update location
app.get("/update-location", (req,res)=>{

    const lat = req.query.lat;
    const lon = req.query.lon;

    classroomLocation.latitude = lat;
    classroomLocation.longitude = lon;

    res.json({
        message: "Location updated",
        latitude: lat,
        longitude: lon
    });

});

// API to get current location
app.get("/gps",(req,res)=>{

    res.json(classroomLocation);

});

app.listen(port,"0.0.0.0",()=>{
    console.log("GPS Microservice running on port 3000");
});