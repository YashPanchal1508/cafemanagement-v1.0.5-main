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

            res.status(201).json(insertOrder);
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
    

})


module.exports = {
    makeOrder
}