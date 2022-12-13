const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const noteRouter = require('./routes/noteRoute');
const tagRouter = require('./routes/tagRoute');
const index = require('./routes/index');

const app = express();

//your mongodb string in ''
mongoose.connect('',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

app.use('/api/v1/notes', noteRouter);
app.use('/api/v1/tags', tagRouter);
app.use('/', index);

app.listen(8080, () => {
  console.log(`App listening on port 8080`)
});

module.exports = app;
