const _ = require('underscore')

function asyncForLoop(cantDeVeces, fn, onFinish) {
    if (onFinish===undefined) {
        onFinish = ()=>{}
    }
    (function innerFn(x) {
        if (x===cantDeVeces) {
            _.defer(onFinish, null)
            return
        }
        fn(x, ()=>{
            _.defer(innerFn, x+1)
        })
    })(0)
}

module.exports = asyncForLoop