const express = require('express');
const cors = require('cors');
const path = require('path'); // <-- ต้องใช้สำหรับ path
const PostRoutes = require('./routes/postroutes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/posts', PostRoutes); // Routes ทั้งหมดของ Post

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
