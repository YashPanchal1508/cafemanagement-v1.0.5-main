require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./config/db');
const cors = require('cors')
const categoryRoutes = require('./routes/category.routes')
const menuRoutes = require('./routes/menu.routes')
const userRoutes = require('./routes/user.routes')
const customerRoutes = require('./routes/customer.routes')
const orderRoutes = require('./routes/order.routes')
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
app.use('/api/user', userRoutes)
app.use('/api/customer', customerRoutes)
app.use('/api/order', orderRoutes)




const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
