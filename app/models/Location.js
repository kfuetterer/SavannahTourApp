var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

var Location = mongoose.model("Location", LocationSchema);

module.exports = Location;
