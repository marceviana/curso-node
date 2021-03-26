const fs = require('fs')
const asyncForLoop = require('../../lovewoman/clase1/lib/asyncforloop')

const dirPath = 'var';
const currentDirPath = process.mainModule.path;
const pathSeparator = "\\";

let path = currentDirPath + pathSeparator + dirPath;

function leerCarpeta(tgtPath, onFinish) {
    fs.readdir(tgtPath, (err, arrArchivos)=>{
        if (err) {
            console.log(err)
            return
        }
        onFinish(arrArchivos)
    })    
}

function recorrer_y_mostrar(arrArchivos, onFinish) {
    console.log('recorrer_y_mostrar');    
    asyncForLoop(arrArchivos.length, (idx, next)=>{
        let archivo = arrArchivos[idx]
        let pathCompleto = [dirPath, archivo].join(pathSeparator)
        fs.readFile(pathCompleto, 'utf8', (err, contenido) => {
            if (err) {
                console.log(err)
                return
            }
            console.log({ archivo, idx })
            next()
        })
    }, ()=>{
        onFinish(arrArchivos)
    })
}

function recorrer_y_borrar(arrArchivos) {
    console.log('recorrer_y_borrar');    
    asyncForLoop(arrArchivos.length, (idx, next)=>{
        let archivo = arrArchivos[idx]
        let pathCompleto = [dirPath, archivo].join(pathSeparator)
        fs.unlink(pathCompleto, (err) => {
            if (err) {
                console.log(err)
                return
            }
            console.log([pathCompleto, 'borrado'].join(': '))
            next()
        })
    }, ()=>{
        console.log('fin de proceso de borrado')
    }) 
}

leerCarpeta(dirPath, arrArchivos=>{
    recorrer_y_mostrar(arrArchivos,recorrer_y_borrar)
})