const express = require ("express")
const app = express()
const bodyParser = require('body-parser')
const cors=require('cors')
const mysql = require ('mysql2')

/*const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password:"Wadih3210",
    database:"projectdatabase"

})*/

const db = mysql.createPool({
    host: "localhost",
    user: "JAK",
    password:"jak1",
    database:"projectdatabase"

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
    });

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
        const sqlDelete = "DELETE FROM mytable WHERE id = (?)";

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

app.listen(5174, () =>{console.log("running on port 5174"); })