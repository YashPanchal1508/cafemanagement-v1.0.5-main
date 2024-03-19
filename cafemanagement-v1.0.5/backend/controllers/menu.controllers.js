const pool = require('../config/db');
const asyncHandler = require("express-async-handler");

const addMenu = asyncHandler(async(req, res) => {
  try {
      // Destructure formdata and pic from the request body
      const { formdata, pic } = req.body;
      const { categoryid, productname, quantity, price } = formdata;
      
      // Insert the new menu item into the database
      const query = 'INSERT INTO menu (productname, quantity, price, categoryid, image) VALUES ($1, $2, $3, $4, $5) RETURNING *';
      const values = [productname, parseInt(quantity), parseInt(price), categoryid, pic];
      const result = await pool.query(query, values);

      // If the insertion was successful, return the newly added menu item
      if (result.rowCount === 1) {
          res.status(201).json({ message: 'Menu item added successfully', data: result.rows[0] });
      } else {
          res.status(500).json({ message: 'Failed to add menu item' });
      }
  } catch (error) {
      console.error('Error adding menu item:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});


const getMenu = asyncHandler(async(req,res)=> {
    const rowsPerPage = parseInt(req.query.rowsPerPage) || 5; // Default to 5 rows per page
    const currentPage = parseInt(req.query.currentPage) || 1;
    
    console.log(typeof(rowsPerPage,currentPage))
  
    try {
      const result = await pool.query({
        text: `SELECT menu.*, category.name 
               FROM menu 
               JOIN category ON menu.categoryid = category.id 
               WHERE menu.isDeleted = false 
               OFFSET $1 LIMIT $2`,
        values: [(currentPage - 1) * rowsPerPage, rowsPerPage],
      });
  
      const totalMenuItemsCount = await pool.query('SELECT COUNT(*) FROM menu WHERE isDeleted = false');
  
      const totalPages = Math.ceil(totalMenuItemsCount.rows[0].count / rowsPerPage);
  
      const menu = result.rows;
  
      res.status(200).json({
        message: 'Menu items retrieved successfully',
        data: menu,
        pagination: {
          totalPages,
          currentPage,
          count: totalMenuItemsCount.rows[0].count,
          rowsPerPage,
        },
      });
    } catch (error) {
      console.error('Error fetching Menu:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
})

const getCatgorylist = asyncHandler(async(req,res) => {
    try {
        const result = await pool.query('SELECT  name , id  FROM category');
        const categories = result.rows;
        res.json(categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
})

const searchMenu = asyncHandler(async(req,res) => {
  try {

    const {search} = req.body
    console.log(search)
    const searchMenuQuery = await pool.query( 'SELECT menu.productname,menu.quantity, menu.price, category.name FROM menu JOIN category ON menu.categoryid = category.id WHERE menu.productname ILIKE $1 OR category.name ILIKE $1',[`%${search}%`])

    res.status(200).json({result : searchMenuQuery.rows})

  } catch (error) {
    console.error('Error Searching categories:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

module.exports = {
    addMenu,
    getMenu,
    getCatgorylist,
    searchMenu
}