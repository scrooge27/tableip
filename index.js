const express = require("express")
const app = new express
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())


db = require("./dbinit.js")

const fetch = require('node-fetch')

const port=8080

app.get("/",(req,res)=>{
    const ip = req.ip
    const stmt = db.prepare(`INSERT INTO users (ip, counter) VALUES (?,?)`)	
    const params =[ip,new Date().toISOString()]
    db.run(stmt, params, (err, result) => {
  })
    db.all("SELECT * FROM users WHERE ip=?",[req.ip],(err,row)=>{
     if (err){
            res.status(401).json({ok:false})
            console.log("crasha")
            return 
        }
    else{
        res.status(200).json({data:row})
    }
})

})



app.listen(port, () => console.log(`App listening to port ${port}`));