const express = require("express")
const app = new express
app.use(express.json())

const bodyParser = require('body-parser')
app.use(bodyParser.json())


db = require("./dbinit.js")

const fetch = require('node-fetch')

const port=8080

let ipTable={}

let stmt

app.use((req,res,next)=>{
  let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if(!ipTable[ip]){
    ipTable[ip]=1
    stmt = (`INSERT INTO users (counter, ip) VALUES (?,?);`) 
 }
 else{
   ipTable[ip]++
   stmt = (`UPDATE users SET counter = ? WHERE ip = ?`) 
 }
 db.run(stmt, [ipTable[ip],ip], (err, row) => {
  if (err) {
    throw err;
  }
})
 next()
})

app.get("/",(req,res)=>{
  res.json(ipTable)
})

app.listen(port, () => console.log(`App listening to port ${port}`));