const express = require('express');
const app = express();
const connectDB = require('./configs/database');
const router = require('./routers');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());

connectDB();
router(app); 

app.listen(3007, () => {
  console.log('Server is running on port 3001');
});