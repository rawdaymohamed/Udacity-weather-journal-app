// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
app.get("/getData", (req, res) => {
    res.send(projectData);
});
app.post("/postData", (req, res) => {
    projectData.temperature = req.body.temp;
    projectData.data = req.body.dt;
    projectData.userResponse = req.body.userResponse;
    projectData.userResponse.feelings = req.body.userResponse.feelings;
    projectData.userResponse.zip = req.body.userResponse.zip;
    console.log(projectData);

});
const port = 8900;
// Setup Server
const server = app.listen(port, ()=>console.log(`Server started at port ${port}`));