const fs = require('fs')
const asyncForLoop = require('../../lovewoman/clase1/lib/asyncforloop')

const dirPath = 'var';
const currentDirPath = process.mainModule.path;
const pathSeparator = "\\";

let path = currentDirPath + pathSeparator + dirPath;

fs.readdir(path, (err, arrArchivos)=>{
    if (err) {
        console.log(err)
        return
    }
    asyncForLoop(arrArchivos.length, (idx, next)=>{
        let archivo = arrArchivos[idx]
        let pathCompleto = [path, archivo].join(pathSeparator)
        fs.unlink(pathCompleto, (err) => {
            if (err) {
                console.log(err)
                return
            }
            setTimeout(()=>{
                next()
            }, 200)
        })
    }, ()=>{
        console.log('fin de proceso')
    })
})

