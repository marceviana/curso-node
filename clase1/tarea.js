// Marcelo y German

const exit = process.exit;

const genUsuario = require('../../lovewoman/clase1/lib/generarUsuario')
const asyncForLoop = require('../../lovewoman/clase1/lib/asyncforloop')
const _ = require('underscore')
const fs = require('fs')

const dirPath = 'var';
const currentDirPath = process.mainModule.path;
const pathSeparator = "\\";

const writeDocs = async (onFinish) => {

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
        console.log('finalizo el proceso')
        onFinish ? onFinish() : exit()
    })
}

const readDocs = () => {

    fs.readdir(dirPath, (err, files) => {
        files.forEach(file => {
          console.log(file);
          fs.readFile(dirPath + '/' + file, 'utf8', function (err,data) {
            if (err) {
              return console.log(err);
            }
            console.log(data);
          });
        });
        setTimeout(() => {
            exit()            
        }, 2000 );
    });
    
}

 writeDocs(readDocs)
//  readDocs()

// console.log({env: process.env})
// console.log({mainModule: process.mainModule.path })