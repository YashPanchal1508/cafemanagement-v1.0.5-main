require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db');
const categoryRoutes = require('./routes/category.routes')
const cors = require('cors')
const app = express();
app.use(cors())

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send("API is running");
});

//****************************************Routes******************************************************* */ 

app.use('/api/category', categoryRoutes)





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
