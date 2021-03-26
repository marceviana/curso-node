const { recorrer_y_hacer } = require('./lib/fileManagers')
const { insertarEnMySQL } = require('./lib/mysql')

function accion() {

    let path = 'var/'
    recorrer_y_hacer(path, insertarEnMySQL, ()=>{
        console.log('EJERCICIO TERMINADO !!!!')
    })
    
}

accion()