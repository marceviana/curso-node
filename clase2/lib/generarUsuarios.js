// Marcelo y German

const exit = process.exit;

const genUsuario = require('./generarUsuario')
const asyncForLoop = require('./asyncforloop')
const _ = require('underscore')
const fs = require('fs')

const currentDirPath = process.mainModule.path;
const pathSeparator = "\\";

const generarUsuarios = async (dirPath, onFinish) => {

    // console.log(genUsuario())
    let isDir = await fs.existsSync(currentDirPath + pathSeparator + dirPath);
    // const isDir = lstatSync.isDirectory() ;
    // console.log({ isDir })
    
    if (!isDir) {
        await fs.mkdirSync(dirPath);
    }

    isDir = await fs.existsSync(currentDirPath + pathSeparator + dirPath);

    if (!isDir) {
        console.log("Directory doesn't exists!")
        return
    }

    asyncForLoop(100, (idx, next) => {
        let obj = genUsuario()
        let usuJson = JSON.stringify(obj)
        let pathArch = dirPath + '/' + obj.id + '.json'
        fs.writeFile(pathArch, usuJson, 'utf8', (err) => {
            if (err) {
                console.log('asyncForLoop', { err })
                return 
            }
            next()
        })
    }, 
    ()=>{
        console.log('Usuarios generados con éxito!')
        onFinish ? onFinish() : exit()
    })
}

module.exports = generarUsuarios;

// console.log({env: process.env})
// console.log({mainModule: process.mainModule.path })