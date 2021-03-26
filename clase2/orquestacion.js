const fs = require('fs')
const asyncForLoop = require('./lib/asyncforloop')
const mysql = require('mysql2');

let path = 'var'

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'curso_node'
});

function leerCarpeta(path, onFinish) {
    fs.readdir(path, (err, arrArchivos)=>{
        if (err) {
            console.log(err)
            return
        }
        onFinish(undefined, arrArchivos)
    })    
}

function recorrer_y_hacer(path, hacer, onFinish) {
    leerCarpeta(path, (err, arrArchivos) => {
        asyncForLoop(arrArchivos.length, (idx, next)=>{
            console.log('---------'+idx+'----------');            
            console.log('asyncForLoop');            
            let archivo = arrArchivos[idx]
            let pathCompleto = [path, archivo].join('\\')
            hacer(pathCompleto, (err)=>{
                console.log('hacer');
                if (err) {
                    console.log(err)
                    return
                }
                next()
            })
        }, ()=>{
            onFinish()
        })  
    })
}

function segundaOrquestacion() {
    let path = 'var'

    recorrer_y_hacer(path, insertarEnMySQL, ()=>{
        console.log('EJERCICIO TERMINADO !!!!')
    })
    
    function leerArchivo(pathCompleto, onFinish) {
        fs.readFile(pathCompleto, 'utf8', (err, contenido) => {
            if (err) {
                console.log(err)
                return
            }
            onFinish(contenido)
        })
    }

    function borrarArchivo(pathCompleto, onFinish) {
        fs.unlink(pathCompleto, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log([pathCompleto, 'borrado'].join(': '))
            onFinish(undefined)
        })
    }
    
    function insertarEnMySQL(pathCompleto, onFinish) {
        console.log('insertarEnMySQL');
        
        leerArchivo(pathCompleto,(contenido)=>{
            const user = JSON.parse(contenido)

            console.log('user',user.firstName);
            
            const { id, firstName, lastName, city, streetName, country, accountName, account, amount } = user;
            const keys = Object.keys(user)
            const values = Object.values(user)
            const queryStr = `INSERT INTO \`users\` (\`${keys.join('`,`')}\`) VALUES ("${values.join('","')}")`;
            
            // console.log('queryStr',queryStr);

            // simple query
            connection.query(
                queryStr,
                function(err, results, fields) {
                    if (err) {
                        console.log({ queryStr, errMsg: err.sqlMessage })
                        return
                    }
                    // console.log({results}); // results contains rows returned by server
                    // console.log({fields}); // fields contains extra meta data about results, if available
                    // borrarArchivo(pathCompleto)
                    onFinish()
                }
            );
            
        })

        // Leer el archivo en el callback
        // insertar en mysql - npm install mysql2 
        // bases (mariadb - mysql)

        // Propuesta de mejora ?
        // Separar en modulos 
    }
}

segundaOrquestacion()
