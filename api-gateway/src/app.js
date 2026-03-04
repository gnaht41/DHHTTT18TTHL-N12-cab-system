require('dotenv').config(); // Chèn thêm dòng này lên trên cùng
const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
const authMiddleware = require('./middlewares/auth.middleware');

const app = express();
app.use(cors());
app.use(express.json());

// Debug nhanh: In ra console để xem URL đã nhận được chưa
console.log("Auth Service URL:", process.env.AUTH_SERVICE_URL);

// Định tuyến request đến các service [1]
app.use(
  '/auth',
  proxy(process.env.AUTH_SERVICE_URL || 'http://localhost:3001', {
    proxyReqPathResolver: function (req) {
      return '/auth' + req.url; 
    }
  })
);
app.use('/users', authMiddleware, proxy(process.env.USER_SERVICE_URL || 'http://localhost:3002'));
app.use('/bookings', authMiddleware, proxy(process.env.BOOKING_SERVICE_URL || 'http://localhost:3004'));

// Route test nội bộ
app.get('/gateway/verify-test', authMiddleware, (req, res) => {
    res.json({
        message: 'JWT hợp lệ! Bạn đã đi qua API Gateway an toàn.',
        user_payload: req.user
    });
});

module.exports = app;