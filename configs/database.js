const mongoose = require('mongoose');

async function connectDB() {
    try { 
        await mongoose.connect('mongodb://127.0.0.1:27017/vps-management', );

        console.log("Database connected successfully");

        //khi kết nối thành công, nếu chưa có tk admin, tạo tk admin...
    } catch (error) {
        console.log("Database connection failed:", error.message);
    }
}

module.exports = connectDB;