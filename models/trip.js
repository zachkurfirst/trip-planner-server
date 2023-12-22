// DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    id: { type: String },
    name: { type: String, required: true, maxlengh: 25 },
    description: { type: String, required: true, maxlength: 100 },
    location: {
      id: String,
      name: String,
      image: String,
    },
    startDate: { type: Date },
    endDate: { type: Date },
    activities: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
