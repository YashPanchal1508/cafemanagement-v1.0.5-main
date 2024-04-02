const pool = require('../config/db');
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
// const verifyToken = require('../middleware/verifyToken');
const JWT_SECRET = "yashpanchaluasnnasuanausas"

const createUser = asyncHandler(async(req,res) => {
    try {
        const { userName, password, email, role } = req.body;

        const checkUser = await pool.query(
            'SELECT * FROM users WHERE username = $1 LIMIT 1',
            [userName]
        );

        if (checkUser.rowCount > 0) {
            return res.status(409).json({ error: "User already exists" });
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const createUser = await pool.query(
                'INSERT INTO users (username, password, email,role) VALUES ($1, $2, $3, $4) RETURNING *',
                [userName, hashedPassword, email, role]
            );

            if (createUser.rowCount > 0) {
                return res.status(201).json({ message: "User created successfully!", user: createUser.rows[0] });
            }
        }
    } catch (error) {
        console.error("Error adding user", error);
        return res.status(500).json({ error: "Some error has occurred" });
    }
})

const loginUser = asyncHandler(async(req,res) => {
    try {

        // console.log(req)

        const { email , password } = req.body;


        const userExist = await pool.query(
        'select * from users where email = $1'
        , [email])

        // console.log(userExist)

        // console.log(userExist)
         
        if(userExist.rowCount === 0){
              return res.status(400).json({error : "User Does Not Exits"})
        }
        
            const user = userExist.rows[0];
            // console.log(user)

            const passwordCompare = await bcrypt.compare(password, user.password)

            if(!passwordCompare){
                return res.status(409).json({error : "Try with correct credentials"})
            }

            const data = {
                users : {
                    name : email,
                    password : password,
                }
            }
            
            const authToken = jwt.sign(data, JWT_SECRET);


                            
            res.status(200).json({message: "User Login SuccessFully", result: user , authToken})

    } catch (error) {
            console.log("Error Login User", error)
            res.status(500).json("Some error has occur") 
    }

})


module.exports = {
   createUser,
   loginUser
}