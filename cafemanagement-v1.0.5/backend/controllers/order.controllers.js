const pool = require('../config/db');
const asyncHandler = require("express-async-handler");

const makeOrder = asyncHandler(async(req,res) => {

    const { orderData,customerid,paymentmode } = req.body

    try {

        const insertOrder = []

        for(const order of orderData){
            const { price, productid, orderedQuantity } = order;
        
            const result = await pool.query(
                'INSERT INTO orders (totalamount, customerid, productid, quantity, paymentmode) VALUES ($1, $2, $3, $4, $5) RETURNING *;',
                [price, customerid, productid, orderedQuantity, paymentmode]
            );
        
            insertOrder.push(result.rows[0]);
        }
        
        res.status(201).json(insertOrder);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    

})

const getOrder = asyncHandler(async(req,res) => {

    try {
        // Execute the query to select all customers
        const result = await pool.query(`
        SELECT o.*, c.firstname AS customername, p.productname AS productname
        FROM orders o
        JOIN customer c ON o.customerid = c.customerid
        JOIN menu p ON o.productid = p.productid
      `);
        
        // Send the query result rows back to the client
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

const updateOrderStatus = asyncHandler(async(req,res) => {
    const { orderId } = req.params;
    const { checkedValue } = req.body;

    try {
        // Execute SQL query to update the status of the order with the provided order ID
        const result = await pool.query(`
            UPDATE orders 
            SET status = ${checkedValue} 
            WHERE orderid = $1
            RETURNING *;
        `, [orderId]);

        // Check if the order with the provided ID exists
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send the updated order as JSON response
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating order status:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})
module.exports = {
    makeOrder,
    getOrder,
    updateOrderStatus
}