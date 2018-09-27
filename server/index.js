const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

// DB Setup
// Requiring our models for syncing
var db = require("./models");

// App Setup
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

// Import routes and give the server access to them.
require("./routes/api-routes-insert.js")(app);
require("./routes/api-routes-read.js")(app);

var initValues = require("./init/initialData.js");

// Server Setup
const PORT = process.env.PORT || 3090;
app.set('port', PORT);

db.sequelize.sync({ force: true }).then(function () {
    initValues();
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
})