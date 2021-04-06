/* 
    cd "C:\Program Files\MongoDB\Server\4.4\bin"
    mongod
    cd myDir
    npm install mongodb
*/

const MongoClient = require('mongodb').MongoClient
const generarUsuario = require('./lib/generarUsuario')

const address = 'localhost';
const port = '27017';
const url = `mongodb://${address}:${port}`;

let objDeprecateCfg = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}

function insertDoc(base, collection, document, onFinish) {
    MongoClient.connect(url, objDeprecateCfg, (err, client)=>{
        if (err) {
            console.error(err);
            onFinish(err)
            return
        }
        // console.log('connected');
        const db = client.db(base)
        const col = db.collection(collection)
        col.insertOne(document, (err2, metadata)=>{
            if (err2) {
                console.log(`se produjo un error ${err2}`)
                onFinish(err2)
                return
            }   
            // console.log(metadata)
            client.close()
            let _id = metadata.insertedId
            onFinish(undefined, { ...document, _id })
        })
    })
}

function insertPromise(base, collection, document) {
    return new Promise((resolve,reject)=>{
        insertDoc(base, collection, document, (error, result)=>{
            if (error) {
                console.error(error);
                reject(error)
                return
            }
            resolve(result) 
        })
    })
}

async function insertAsync(base, collection, document) {
    let result, error;
    try {
        result = await insertPromise(base, collection, document)
    } catch (err) {
        console.error(err);
        error = err;
    }
    return { result, error }
}

const base = 'curso_mongo';
const collection = 'orders';
const document = generarUsuario();

let clone = doc => JSON.parse(JSON.stringify(doc));

(async ()=>{
    let asyncResult = await insertAsync(base, collection, clone(document))
    console.log('asyncResult',asyncResult);
})();

insertDoc(base, collection, clone(document), (err, result) => {
    console.log('insertResult',{ err, result })
});

