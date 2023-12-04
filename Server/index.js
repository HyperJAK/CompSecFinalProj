const express = require ("express")
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')
const mysql = require ('mysql2')
require('dotenv').config();


const db = mysql.createPool({
    host: process.env.MYSQL_SERVER_DB_IP,
    user: process.env.MYSQL_SERVER_USER_NAME,
    password: process.env.MYSQL_SERVER_USER_PASSWORD,
    database: process.env.MYSQL_SERVER_DB_NAME

})





app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req,res)=> {
    const sqlSelect = "SELECT * FROM mytable";
    db.query(sqlSelect, (err, result)=>{
        res.send(result)
    });

});

app.get("/api/getUsers", (req, res) => {
    const sqlSelectUsers = "SELECT email,password FROM userstable";
    db.query(sqlSelectUsers, (err, result) => {
        res.send(result);
        console.log(result)
    });

});

app.post('/api/updateUserPic', (req, res) => {
    try {
        const { image, id } = req.body;


        /*if (!req.file) {
            return res.status(400).json({ error: 'No file provided.' });
        }*/

        // Your SQL query to update the user profile picture
        const sql = 'UPDATE mytable SET picture = ? WHERE id = ?';

        db.query(sql, [image, id], (error, results) => {
            if (error) {
                console.error('Error updating user profile picture:', error);
                return res.status(500).json({ error: 'Internal server error.' });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'User not found.' });
            }

            res.status(200).json({ message: 'User profile picture updated successfully.' });
            console.log(results.affectedRows)
        });

    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.get("/api/getRole", (req, res) => {
    const { userEmail } = req.query; // Assuming you pass the user's email as a query parameter
    const sqlSelectRole = "SELECT role FROM userstable WHERE email = ?";
    
    db.query(sqlSelectRole, [userEmail], (err, result) => {
      if (err) {
        console.error('Error fetching user role:', err);
        res.status(500).send('Internal Server Error');
      } else {
        if (result.length > 0) {
          const role = result[0].role;
          res.send({ role: role });
          console.log(result);
        } else {
          res.status(404).send('User not found');
        }
      }
    });
  });

app.post("/api/insert", (req,res)=>{


    app.delete("/api/delete/:id", (req, res) => {
        const idToDelete = req.params.id;
        const sqlDelete = "DELETE FROM mytable WHERE id = ?";

        db.query(sqlDelete, idToDelete, (err, result) => {
            if (err) {
                console.error("Error deleting record:", err);
                return res.status(500).send("Internal Server Error");
            }

            res.status(200).send("Record deleted successfully");
        });
    });



    const name=req.body.name;
    const email=req.body.email;
    const title=req.body.title;
    const department=req.body.department;
    const status=req.body.status;
    const position=req.body.position;
    const picture=req.body.picture;
    const allowed=req.body.allowed;

    const sqlInsert = "INSERT INTO mytable (name,email,title,department,status,position,picture,allowed) VALUES (?,?,?,?,?,?,?,?)";
    db.query(sqlInsert, [name,email,title,department,status,position,picture,allowed], (err, result)=>{
    });

});

app.post("/api/insertUser", (req, res) => {
    const email = req.body.mail;
    const password = req.body.pass;
    const role=req.body.role;

const sqlInsertUser = "INSERT INTO userstable (email, password, role) VALUES (?, ?, ?)";
    db.query(sqlInsertUser, [email, password,role], (err, result) => {
    });
});



app.post("/api/updateUser", (req, res) => {
    const email = req.body.mail;
    const role=req.body.role;

    const sqlUpdateUser = "update userstable set role = ? where email = ?";
    db.query(sqlUpdateUser, [role, email], (err, result) => {
    });
});

app.listen(5174, () =>{console.log("running on port 5174"); })