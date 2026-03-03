const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true
    },
    pickup_location: {
      type: String,
      required: true
    },
    destination: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["PENDING", "ASSIGNED", "COMPLETED", "CANCELLED"],
      default: "PENDING"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);