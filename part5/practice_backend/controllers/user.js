const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

//finding all users
usersRouter.get('/', async (request, response, next) => {
  try {

    const users = await User
      .find({})
      .populate('notes',{
        content: 1,
        important: 1
      })
  
    if (users){
      response.json(users)
      logger.info('Users: ', users)
    } else {
      logger.error('Error finding users')
      response.status(404).end()
    } 

  } catch (error) {
    next(error)
  }
   
})

///adding a user
usersRouter.post('/', async (request, response, next) => {

  try {
    const { name, username, password } = request.body
  
    if ( !name || !username ){
      return response.status(400).json({
        error: 'Bad Request: Data missing'
      })
    }

    if ( !password || password.length < 3){
      return response.status(400).json({ 
        error: 'Bad Request: Password missing or must have more than 3 characters' 
      })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const userObject = new User({
      name, 
      username,
      passwordHash
    })

    const savedUser = await userObject.save()
    logger.info('User added: ', savedUser)
    response.status(201).json(savedUser)
  
  } catch (error) {
    console.log('BOdy: ', error.body.error)
    next(error)
  }
})

module.exports = usersRouter