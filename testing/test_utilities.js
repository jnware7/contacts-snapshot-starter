
const {db} = require('../database')


const truncateTables = function(){
  return db.none(`TRUNCATE contacts RESTART IDENTITY`)
}
const seedTalbes = function(){
 return db.none('INSERT INTO contacts (first_name,last_name) VALUES($1::text,$2::text)',['Jared','Grippie'])
   .then(function(){return db.none('INSERT INTO contacts (first_name,last_name) VALUES($1::text,$2::text)',['Tanner','Welsh'])})
   .then(function(){return db.none('INSERT INTO contacts (first_name,last_name) VALUES($1::text,$2::text)',['NeEddra','James'])})
}

// const seedTables = () =>
//   db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['Jared','Grippe'] )
//     .then( () => db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['Tanner','Welsh']) )
//     .then( () => db.none('INSERT INTO contacts (first_name, last_name) VALUES ($1::text, $2::text)', ['NeEddra','James']) )


const initdb = function(){
  return truncateTables()
  .then(function(){
    return seedTalbes()
  })
}

module.exports = { initdb }
