//no imprima en la consola en modo de prueba
const info = (...params) => {

  if (process.env.NODE_ENV !== 'test'){
    console.log(...params)
  }
} 

// no imprima en la consola en modo de prueba
const error = (...params) => {

  if (process.env.NODE_ENV !== 'test'){
    console.error(...params)
  }
}

module.exports = { 
  info, 
  error 
}