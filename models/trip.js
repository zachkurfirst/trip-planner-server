// DEPENDENCIES
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TripSchema = new Schema(
  {
    name: { type: String, required: true, maxlengh: 25 },
    description: { type: String, required: true, maxlength: 100 },
    // TODO: location object with fields for city, state?
    location: { type: String },
    // TODO: validation for date fields - no past dates, endDate must come after startDate
    startDate: { type: Date },
    endDate: { type: Date },
    // TODO: embedded data relationship
    activities: [],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trip", TripSchema);
