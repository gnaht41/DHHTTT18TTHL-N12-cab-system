const bookingService = require("../services/booking.service");

const getAll = async (req, res) => {
  try {
    const bookings = await bookingService.getAllBookings();
    res.status(200).json(bookings);
  } catch {
    res.status(500).json({ error: "Fetch failed", details: err.message });
  }
};

const create = async (req, res) => {
  try {
    const booking = await bookingService.createBooking(req.body);
    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: "Create failed", details: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const booking = await bookingService.getBookingById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed", details: err.message });
  }
};

module.exports = {
  getAll,
  create,
  getById
};