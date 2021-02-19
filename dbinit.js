const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./db.DB3')

db.serialize( () =>{
  db.run("CREATE TABLE IF NOT EXISTS users (ip TEXT, counter INT)")
})

module.exports = db