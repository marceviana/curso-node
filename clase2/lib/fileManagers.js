const fs = require('fs')
const asyncForLoop = require('./asyncforloop')

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
function leerArchivo(pathCompleto, onFinish) {
    fs.readFile(pathCompleto, 'utf8', (err, contenido) => {
        if (err) {
            console.log(err)
            return
        }
        // console.log(contenido) 
        onFinish(err, contenido)
    })
}
function borrarArchivo(pathCompleto, onFinish) {
    fs.unlink(pathCompleto, (err) => {
        if (err) {
            console.log(err)
            return
        }
        // console.log([pathCompleto, 'borrado'].join(': '))
        onFinish(undefined)
    })
}
const readFiles = (dirPath, onFile, onFinish) => {
    fs.readdir(dirPath, (err, files) => {
        files.forEach((file, i) => {
          fs.readFile(dirPath + '/' + file, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            onFile && onFile(data)
            if (i+1==files.length) {
                onFinish && onFinish()
            }
          });
        });
    });
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

module.exports = {
    leerCarpeta,
    leerArchivo,
    borrarArchivo,
    readFiles,
    recorrer_y_hacer
}