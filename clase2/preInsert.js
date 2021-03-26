const fs = require('fs')
const asyncForLoop = require('./lib/asyncforloop')
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'Only4me1',
    database: 'curso_node'
  });

  //Leer Archivo
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
            let archivo = arrArchivos[idx]
            let pathCompleto = [path, archivo].join('')
            hacer(pathCompleto, (err)=>{
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
function insertarEnMySQL(pathCompleto, onFinish) {
     mostrarArchivo(pathCompleto, (err, contenido) => {
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
function mostrarArchivo(pathCompleto, onFinish) {
    fs.readFile(pathCompleto, 'utf8', (err, contenido) => {
        if (err) {
            console.log(err)
            return
        }
        console.log(contenido) 
        onFinish(err, contenido)
    })
}

function accion() {
    let path = 'var/'
    recorrer_y_hacer(path, mostrarArchivo, ()=>{
        console.log('EJERCICIO TERMINADO !!!!')
    })
    
    function mostrarArchivo(pathCompleto, onFinish) {
        fs.readFile(pathCompleto, 'utf8', (err, contenido) => {
            if (err) {
                console.log(err)
                return
            }
            console.log(contenido) 
            onFinish(undefined)
        })
    }

}
function accion2() {
    let path = 'var/'
    recorrer_y_hacer(path, insertarEnMySQL, ()=>{
        console.log('EJERCICIO TERMINADO !!!!')
    })
    
}

accion2()