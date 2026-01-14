const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('users api', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'root', name: 'Root User', passwordHash })
    await user.save()
  })

  describe('GET /api/users', () => {
    test('users are returned as json', async () => {
      await api
        .get('/api/users')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all users are returned', async () => {
      const response = await api.get('/api/users')
      assert.strictEqual(response.body.length, 1)
    })

    test('a specific user is within the returned users', async () => {
      const response = await api.get('/api/users')
      const usernames = response.body.map(u => u.username)
      assert(usernames.includes('root'))
    })

    test('users have id property instead of _id', async () => {
      const response = await api.get('/api/users')
      const user = response.body[0]
      assert(user.id)
      assert.strictEqual(user._id, undefined)
    })

    test('passwordHash is not returned', async () => {
      const response = await api.get('/api/users')
      const user = response.body[0]
      assert.strictEqual(user.passwordHash, undefined)
    })

    test('users are populated with cards', async () => {
      const response = await api.get('/api/users')
      const user = response.body[0]
      assert(Array.isArray(user.cards))
    })
  })

  describe('POST /api/users', () => {
    test('succeeds with valid data', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('created user has correct properties', async () => {
      const newUser = {
        username: 'testuser123',
        name: 'Test User',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      assert.strictEqual(result.body.username, newUser.username)
      assert.strictEqual(result.body.name, newUser.name)
      assert(result.body.id)
      assert.strictEqual(result.body.passwordHash, undefined)
    })

    test('user password is hashed', async () => {
      const newUser = {
        username: 'secureuser',
        name: 'Secure User',
        password: 'mypassword',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)

      const usersAtEnd = await helper.usersInDb()
      const createdUser = usersAtEnd.find(u => u.username === newUser.username)

      // Get the user from DB to check passwordHash
      const userInDb = await User.findById(createdUser.id)
      assert.notStrictEqual(userInDb.passwordHash, newUser.password)
      assert(userInDb.passwordHash.startsWith('$2b$'))
    })

    test('fails with status code 400 if username is missing', async () => {
      const newUser = {
        name: 'No Username User',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
    })

    test('fails with status code 400 if password is missing', async () => {
      const newUser = {
        username: 'nopassword',
        name: 'No Password User',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
      assert(result.body.error.includes('Password must be at least 4 characters'))
    })

    test('fails with status code 400 if password is too short', async () => {
      const newUser = {
        username: 'shortpass',
        name: 'Short Password User',
        password: 'abc',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
      assert(result.body.error.includes('Password must be at least 4 characters'))
    })

    test('fails with status code 400 if username is too short', async () => {
      const newUser = {
        username: 'ab',
        name: 'Short Username User',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
    })

    test('fails with status code 400 if username already exists', async () => {
      const newUser = {
        username: 'root',
        name: 'Duplicate User',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
    })

    test('fails with status code 400 if username contains invalid characters', async () => {
      const newUser = {
        username: 'user@name',
        name: 'Invalid Username',
        password: 'password123',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      assert(result.body.error)
    })

    test('does not create user if validation fails', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'invaliduser',
        name: 'No Password',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })
})

after(async () => {
  await mongoose.connection.close()
})
