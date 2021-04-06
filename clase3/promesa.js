const promesa = (a,b) =>new Promise((resolve,reject)=>{
    if (a+b!==5) {
        reject('Ocurrio un error')
        return
    }
    setTimeout(resolve, 3000, a+b);
});

// promesa(2,3)
// .then(r=>console.log(`el resultado es: ${r}`))
// .catch(err=>console.log(`Ocurrió un error: ${err}`))
let ana = ()=>{

}

// (async ()=>{
//     for (let i = 0; i < 10; i++) {
//         console.log(' ------ ')
//         console.log('sumando '+i)
//         try {
//             console.log(`el resultado es: ${await promesa(i,1)}`)    
//         } catch (err) {
//             console.log(`${i+1} no es 5`)
//         }
//     }
// })()

