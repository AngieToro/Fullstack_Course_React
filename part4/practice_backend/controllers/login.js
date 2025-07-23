require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {

  const { username, password } = request.body

  const user = await User.findOne( { username })
  console.log('User connected: ', user)

  const passwordCorrect = user === null
    ? false     //si no se encontró un usuario en la base de datos
    : await bcrypt.compare(password, user.passwordHash) 
  //Extrae la sal del hash.
  //Reaplica el hash a la contraseña que ingresó el usuario.
  //Compara el resultado.
  //Devuelve true si coinciden.

  if (!(user && passwordCorrect)){
    return response.status(401).json({ error: 'Invalid username or passowrd' })
  }

  const userToken = {
    username: user.username,
    id: user._id
  }

  //se crea el token
  //Token firmado digitalmente
  const token = jwt.sign(
    userToken, 
    process.env.SECRET,
    { expiresIn: 60*60 } //1 hora
  )  

  response
    .status(200)
    .send({ 
      token,
      username: user.username,
      name: user.name
    })
})

module.exports = loginRouter