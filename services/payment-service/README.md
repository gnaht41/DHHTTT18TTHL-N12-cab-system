## 1. Yêu cầu hệ thống

Cần cài đặt:

Node.js >= 18

Docker Desktop

PostgreSQL (local hoặc Docker)

## 🐘 2. Tạo Database PostgreSQL

Mở terminal:

psql -U postgres

Tạo database:

CREATE DATABASE payment_db;

Thoát:
\q
## 🐳 3. Chạy Kafka Local bằng Docker
### Start Zookeeper
docker run -d -p 2181:2181 --name zookeeper -e ZOOKEEPER_CLIENT_PORT=2181 confluentinc/cp-zookeeper:7.5.0
### Start Kafka
docker run -d -p 9092:9092 --name kafka -e KAFKA_ZOOKEEPER_CONNECT=host.docker.internal:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka:7.5.0

Kiểm tra container:

docker ps

Phải thấy:

kafka
zookeeper
## ⚙️ 4. Tạo file .env

Trong thư mục:

services/payment-service

Tạo file .env:

PORT=3002

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=your_password
DB_NAME=payment_db

KAFKA_BROKER=localhost:9092

⚠ Không có khoảng trắng quanh dấu =

## 📦 5. Cài dependencies

Trong thư mục payment-service:

npm install
## 🚀 6. Start Payment Service
npm start

Nếu thành công sẽ thấy:

Payment Service running on port 3002
[Consumer] Starting
🌐 7. Test Service

Mở trình duyệt:

http://localhost:3002/health

Kết quả:

{
  "status": "Payment Service OK"
}
## 📤 8. Test Kafka Event

Chạy file test producer:

node test-producer.js

Terminal sẽ in:

RideCompleted event sent

Payment service sẽ log:

Nếu rideId mới:
💳 Payment processed successfully
Nếu rideId đã tồn tại:
⚠ Payment already exists
🗄 9. Kiểm tra dữ liệu trong DB
SELECT * FROM payments;

Ví dụ:

id                                   | ride_id       | amount  | status
-------------------------------------|--------------|---------|--------
d3769fc9-xxxx-xxxx-xxxx-xxxxxxxxxxxx | ride-local-1 | 200000  | SUCCESS