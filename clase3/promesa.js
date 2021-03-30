const promesa = (a,b) =>new Promise((resolve,reject)=>{
    if (a+b!==5) {
        reject('Ocurrio un error')
        return
    }
    setTimeout(resolve, 3000, a+b);
})

promesa(2,3)
.then(r=>console.log(`el resultado es: ${r}`))
.catch(err=>console.log(`Ocurrió un error: ${err}`))

for (let i = 0; i < 10; i++) {
    console.log(await promesa(i,3))    
}