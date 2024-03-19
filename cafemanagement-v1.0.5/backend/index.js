require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db');
const categoryRoutes = require('./routes/category.routes')
const cors = require('cors')
const menuRoutes = require('./routes/menu.routes')
const app = express();
const fileUpload = require('express-fileupload'); // Add this line for file uploads

app.use(cors())
app.use(fileUpload())
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("API is running");
});

//****************************************Routes******************************************************* */ 

app.use('/api/category', categoryRoutes)
app.use('/api/menu', menuRoutes)





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
