const pool = require('../config/db');
const asyncHandler = require("express-async-handler");

const addCategory = asyncHandler(async (req, res) => {
    try {
        const { name, page, limit } = req.body;

        // Check if the category already exists
        const checkCategoryQuery = await pool.query('SELECT * FROM category WHERE name = $1', [name]);
        if (checkCategoryQuery.rowCount > 0) {
            return res.status(400).json({
                status: 400,
                message: "Category already exists"
            });
        }

        // Insert the new category into the database
        const insertCategoryQuery = await pool.query('INSERT INTO category (name) VALUES ($1) RETURNING *', [name]);
        const offset = (page - 1) * limit
        const allCategory = await pool.query('select * from category limit $1 offset $2',[limit, offset]);

        // Get the total count of categories
        const totalCountQuery = await pool.query('SELECT COUNT(*) FROM category');
        const totalCount = parseInt(totalCountQuery.rows[0].count);

        res.status(201).json({
            status: 201,
            message: "Category added successfully",
            data: allCategory.rows,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            }
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const { name, page, limit } = req.body;
        // Delete the category from the database
        await pool.query('DELETE FROM category WHERE name = $1', [name]);
        const offset = (page - 1) * limit
        const allCategory = await pool.query('SELECT * FROM category limit $1 offset $2',[limit, offset])
        // Get the total count of categories after deletion
        const totalCountQuery = await pool.query('SELECT COUNT(*) FROM category');
        const totalCount = parseInt(totalCountQuery.rows[0].count);

        res.status(201).json({
            status: 201,
            message: "Category deleted successfully",
            data: allCategory.rows,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            }
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const getCategory = asyncHandler(async (req, res) => {
    try {
        let { page, limit } = req.query;

        // Convert page and limit to numbers
        page = parseInt(page);
        limit = parseInt(limit);

        // Calculate the offset based on the current page and limit
        const offset = (page - 1) * limit;

        // Query to fetch categories with pagination
        const checkCategoryQuery = await pool.query('SELECT * FROM category LIMIT $1 OFFSET $2', [limit, offset]);

        // Query to fetch total count of categories
        const totalCountQuery = await pool.query('SELECT COUNT(*) FROM category');
        const totalCount = parseInt(totalCountQuery.rows[0].count);

        // Sending the response
        res.status(200).json({
            status: 200,
            message: "Category fetch successfully",
            data: checkCategoryQuery.rows,
            pagination: {
                totalCount,
                totalPages: Math.ceil(totalCount / limit),
                currentPage: page,
            }
        });

    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})




module.exports = {
    addCategory,
    deleteCategory,
    getCategory
}