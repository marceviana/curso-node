const { leerArchivo } = require('./fileManagers')
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'curso_node'
});

function insertarEnMySQL(pathCompleto, onFinish) {
    leerArchivo(pathCompleto, (err, contenido) => {
        if (err) {
           console.log(err)
           return
        }
        try{
           var json = JSON.parse(contenido) 
           var values = Object.values(json)
           var keys = Object.keys(json)
           connection.query(
               'INSERT INTO `curso_node`.`users`  (`'+ keys.join('`,`')+'`) VALUES ("'+ values.join('","')+'");',
               function(err, results, fields) {
                   if(err){
                       console.log(err); 
                       return
                   }
                 onFinish()
               }
             );
        }catch(err){
            console.log('Valores',values)
            console.log('Keys: ', keys)
            console.log(contenido)
        }
   })
}

module.exports = {
    insertarEnMySQL
};