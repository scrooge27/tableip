const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.DB3')

db.serialize( () =>{
  db.run("CREATE TABLE IF NOT EXISTS users (counter INT, ip TEXT);")
})

module.exports = db