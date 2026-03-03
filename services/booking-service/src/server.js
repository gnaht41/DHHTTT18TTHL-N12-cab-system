require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Booking Service running on port ${PORT}`);
});