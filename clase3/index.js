const obj = {
    arrow: (paso)=>{
        console.log(paso, Object.keys(this) );
    },
    log2: function(paso){
        console.log(paso, Object.keys(this) );
    },
    paso1: function(){
        this.arrow('paso1');
        return obj
    },
    paso2: function(){
        this.log2('paso2');
        return obj
    },
    paso3: function(){
        this.arrow('paso3');
        return obj
    },
    paso4: function(){
        this.log2('paso4');
        return obj
    },
}

// obj
// .paso1()
// .paso2()
// .paso3()
// .paso4()
// .paso3()
// .paso2()
// .paso1()

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