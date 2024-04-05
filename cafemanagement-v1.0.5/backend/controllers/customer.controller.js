const pool = require('../config/db');
const asyncHandler = require("express-async-handler");

const createCustomer = asyncHandler(async(req,res) => {

    const { orderDetails} = req.body
    const { firstName, lastName,phoneNumber,email,message,paymentMethod } = orderDetails
   
    try {
        if (!firstName || !lastName || !phoneNumber || !email || !paymentMethod) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await pool.query('INSERT INTO customer (firstname, lastname, phonenumber, email, paymentmode, feedback) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [firstName, lastName, phoneNumber, email, paymentMethod, message]);
        // console.log(result.rows[0])
        res.status(201).json({ message: 'Customer created successfully', data: result.rows[0] });


    } catch (error) {
        console.error('Error adding Customer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }


})


const getCustomer = asyncHandler(async (req, res) => {
    try {
        // Query to retrieve customer details along with the total amount spent
        const query = `
            SELECT c.*, o.totalamount AS total_spent
            FROM customer c
            LEFT JOIN orders o ON c.customerid = o.customerid;
        `;
        
        const result = await pool.query(query);

        res.status(200).json({ message: 'Customer data retrieved successfully', data: result.rows });
    } catch (error) {
        console.error('Error retrieving customer data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = {
    createCustomer,
    getCustomer

}