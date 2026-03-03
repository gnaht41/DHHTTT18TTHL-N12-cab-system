const Booking = require("../models/booking.model");

const getAllBookings = async () => {
  return await Booking.find();
};

const createBooking = async (data) => {
  return await Booking.create(data);
};

const getBookingById = async (id) => {
  return await Booking.findById(id);
};

module.exports = {
  getAllBookings,
  createBooking,
  getBookingById
};