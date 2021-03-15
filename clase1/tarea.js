// Marcelo y German

const exit = process.exit;

const genUsuario = require('../../lovewoman/clase1/lib/generarUsuario')
const asyncForLoop = require('../../lovewoman/clase1/lib/asyncforloop')
const _ = require('underscore')
const fs = require('fs')

const testFolder = 'var';

const writeDocs = () => {

    console.log(genUsuario())
    asyncForLoop(100, (idx, next) => {
        let obj = genUsuario()
        let usuJson = JSON.stringify(obj)
        let pathArch = testFolder + '/' + obj.id + '.json'
        fs.writeFile(pathArch, usuJson, 'utf8', (err) => {
            if (err) {
                console.log(err)
                return 
            }
            next()
        })
    }, 
    ()=>{
        console.log('finalizo el proceso')
        exit()
    })
}

const readDocs = () => {

    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
          console.log(file);
          fs.readFile(testFolder + '/' + file, 'utf8', function (err,data) {
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

 writeDocs()
 readDocs()

// console.log({env: process.env})
// console.log({mainModule: process.mainModule.path })