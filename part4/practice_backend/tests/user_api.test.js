const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // la aplicación Express
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const { log } = require('node:console')

const api = supertest(app)

describe('API User search test', () => {

  beforeEach(async () => {

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)

    const user = new User (
      {
        name: 'Superuser',
        username: 'root',
        passwordHash
      }
    )
    await user.save()
  })

  test('creation succeeds with a fresh username', async() => {

    const usersAll = await helper.usersInDB()

    const newUser = {
      name: 'Angelica',
      username: 'atoro',
      password: '12345'
    }
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await helper.usersInDB()
    assert.strictEqual(users.length, usersAll.length + 1)

    const usernames = users.map(user => user.username)
    assert(usernames.includes(newUser.username)) 
  }) 
  
  test('creation fails with proper statuscode and message if username already taken', async() => {

    const usersAll = await helper.usersInDB()

    const newUser = {
      name: 'Angelica',
      username: 'atoro',
      password: '12345'
    }
    
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert(result.body.error.includes('expected `username`to be unique'))

    const users = await helper.usersInDB()
    assert.strictEqual(users.length, usersAll.length)

  })
})

after(async () => {
  await mongoose.connection.close()
})

