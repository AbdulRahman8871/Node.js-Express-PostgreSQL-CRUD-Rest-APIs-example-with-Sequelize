const express = require("express");
const cors = require("cors");
const db = require("./models");
const app = express();

var corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced DB...")
    })
    .catch((error) => {
        console.log("Failed to sync DB: " + error);
    })




// simple route
app.get("/", (req, res) => {
    res.json({ message: "Wellcome to abdulrahman applicaion" })
});

require("./routes/tutorial.routes")(app)

// set port, listen for request
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
