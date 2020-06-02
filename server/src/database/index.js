const mongoose = require('mongoose');
const uri = `mongodb://localhost/iot-manager`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => console.log("Successfully Connection!"));

module.exports = mongoose;
