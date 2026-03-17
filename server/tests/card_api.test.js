const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Card = require('../models/card')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('cards api', () => {
  let testUser
  let testToken

  beforeEach(async () => {
    // Clear database
    await Card.deleteMany({})
    await User.deleteMany({})

    // Create test user
    testUser = await helper.createTestUser()
    testToken = helper.getTokenForUser(testUser._id.toString())

    // Insert initial cards with user reference
    const cardObjects = helper.initialCards.map(card => new Card({
      ...card,
      user: testUser._id
    }))
    const promiseArray = cardObjects.map(card => card.save())
    const savedCards = await Promise.all(promiseArray)

    // Update user with card references using findByIdAndUpdate to avoid VersionError
    testUser = await User.findByIdAndUpdate(
      testUser._id,
      { cards: savedCards.map(card => card._id) },
      { new: true }
    )
  })

  describe('GET /api/cards', () => {
    test('cards are returned as json', async () => {
      await api
        .get('/api/cards')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all cards are returned', async () => {
      const response = await api.get('/api/cards')
      assert.strictEqual(response.body.length, helper.initialCards.length)
    })

    test('a specific card is within the returned cards', async () => {
      const response = await api.get('/api/cards')
      const playerNames = response.body.map(r => r.playerName)
      assert(playerNames.includes('Mike Trout'))
    })
  })

  describe('GET /api/cards/stats', () => {
    test('stats are returned as json', async () => {
      await api
        .get('/api/cards/stats')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('returns correct counts for initial cards', async () => {
      const response = await api.get('/api/cards/stats')

      assert.strictEqual(response.body.total, 2)
      assert.strictEqual(response.body.forSale, 2)
      assert.strictEqual(response.body.notForSale, 0)
    })

    test('returns correct counts after adding a not-for-sale card', async () => {
      const newCard = new Card({
        playerName: 'Babe Ruth',
        teamName: 'New York Yankees',
        series: 'Vintage',
        yearReleased: 1933,
        stock: 1,
        price: 10000,
        forSale: false,
        user: testUser._id
      })
      await newCard.save()

      const response = await api.get('/api/cards/stats')

      assert.strictEqual(response.body.total, 3)
      assert.strictEqual(response.body.forSale, 2)
      assert.strictEqual(response.body.notForSale, 1)
    })

    test('returns zeros when no cards exist', async () => {
      await Card.deleteMany({})

      const response = await api.get('/api/cards/stats')

      assert.strictEqual(response.body.total, 0)
      assert.strictEqual(response.body.forSale, 0)
      assert.strictEqual(response.body.notForSale, 0)
    })
  })

  describe('GET /api/cards/:id', () => {
    test('succeeds with a valid id', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToView = cardsAtStart[0]

      const resultCard = await api
        .get(`/api/cards/${cardToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(resultCard.body.playerName, cardToView.playerName)
      assert.strictEqual(resultCard.body.teamName, cardToView.teamName)
      assert.strictEqual(resultCard.body.id, cardToView.id)
    })

    test('fails with status code 404 if card does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .get(`/api/cards/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with status code 400 if id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/api/cards/${invalidId}`)
        .expect(400)
    })
  })

  describe('POST /api/cards', () => {
    test('succeeds with valid data and token', async () => {
      const newCard = {
        playerName: 'Aaron Judge',
        teamName: 'New York Yankees',
        series: 'Topps Series 1',
        yearReleased: 2017,
        ebayUrl: 'https://ebay.com/judge',
        imageUrl: 'https://example.com/judge.jpg',
        stock: 10,
        price: 500,
        forSale: true
      }

      await api
        .post('/api/cards')
        .set('Authorization', `Bearer ${testToken}`)
        .send(newCard)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length + 1)

      const playerNames = cardsAtEnd.map(c => c.playerName)
      assert(playerNames.includes('Aaron Judge'))
    })

    test('card is associated with the correct user', async () => {
      const newCard = {
        playerName: 'Ronald Acuña Jr.',
        teamName: 'Atlanta Braves',
        series: 'Bowman Chrome',
        yearReleased: 2018,
        stock: 2,
        price: 800,
        forSale: true
      }

      const response = await api
        .post('/api/cards')
        .set('Authorization', `Bearer ${testToken}`)
        .send(newCard)
        .expect(201)

      const savedCard = await Card.findById(response.body.id)
      assert.strictEqual(savedCard.user.toString(), testUser._id.toString())
    })

    test('fails with status code 401 if token is not provided', async () => {
      const newCard = {
        playerName: 'Mookie Betts',
        teamName: 'Los Angeles Dodgers',
        series: 'Topps Chrome',
        yearReleased: 2014
      }

      await api
        .post('/api/cards')
        .send(newCard)
        .expect(401)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })

    test('fails with status code 401 if token is invalid', async () => {
      const newCard = {
        playerName: 'Mookie Betts',
        teamName: 'Los Angeles Dodgers',
        series: 'Topps Chrome',
        yearReleased: 2014
      }

      await api
        .post('/api/cards')
        .set('Authorization', 'Bearer invalidtoken123')
        .send(newCard)
        .expect(401)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })

    test('fails with status code 400 if playerName is missing', async () => {
      const newCard = {
        teamName: 'Boston Red Sox',
        series: 'Topps Chrome',
        yearReleased: 2015
      }

      await api
        .post('/api/cards')
        .set('Authorization', `Bearer ${testToken}`)
        .send(newCard)
        .expect(400)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })
  })

  describe('PUT /api/cards/:id', () => {
    test('succeeds with valid data and token for own card', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToUpdate = cardsAtStart[0]

      const updatedData = {
        ...cardToUpdate,
        price: 2500,
        stock: 1,
        forSale: false
      }

      const response = await api
        .put(`/api/cards/${cardToUpdate.id}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send(updatedData)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      assert.strictEqual(response.body.price, 2500)
      assert.strictEqual(response.body.stock, 1)
      assert.strictEqual(response.body.forSale, false)
    })

    test('can update specific fields only', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToUpdate = cardsAtStart[0]

      const updatedData = {
        price: 3000
      }

      const response = await api
        .put(`/api/cards/${cardToUpdate.id}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send(updatedData)
        .expect(200)

      assert.strictEqual(response.body.price, 3000)
      assert.strictEqual(response.body.playerName, cardToUpdate.playerName)
    })

    test('fails with status code 401 if token is not provided', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToUpdate = cardsAtStart[0]

      const updatedData = {
        price: 2500
      }

      await api
        .put(`/api/cards/${cardToUpdate.id}`)
        .send(updatedData)
        .expect(401)
    })

    test('fails with status code 401 if user tries to update another user\'s card', async () => {
      // Create another user
      const anotherUser = new User({
        username: 'anotheruser',
        name: 'Another User',
        passwordHash: 'hash'
      })
      await anotherUser.save()
      const anotherToken = helper.getTokenForUser(anotherUser._id.toString())

      const cardsAtStart = await helper.cardsInDb()
      const cardToUpdate = cardsAtStart[0]

      const updatedData = {
        price: 2500
      }

      await api
        .put(`/api/cards/${cardToUpdate.id}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .send(updatedData)
        .expect(401)
    })

    test('fails with status code 404 if card does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      const updatedData = {
        price: 2500
      }

      await api
        .put(`/api/cards/${validNonexistingId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .send(updatedData)
        .expect(404)
    })
  })

  describe('DELETE /api/cards/:id', () => {
    test('succeeds with status code 204 if id is valid and user owns card', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToDelete = cardsAtStart[0]

      await api
        .delete(`/api/cards/${cardToDelete.id}`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(204)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length - 1)

      const playerNames = cardsAtEnd.map(c => c.playerName)
      assert(!playerNames.includes(cardToDelete.playerName))
    })

    test('fails with status code 401 if token is not provided', async () => {
      const cardsAtStart = await helper.cardsInDb()
      const cardToDelete = cardsAtStart[0]

      await api
        .delete(`/api/cards/${cardToDelete.id}`)
        .expect(401)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })

    test('fails with status code 401 if user tries to delete another user\'s card', async () => {
      // Create another user
      const anotherUser = new User({
        username: 'deleteuser',
        name: 'Delete User',
        passwordHash: 'hash'
      })
      await anotherUser.save()
      const anotherToken = helper.getTokenForUser(anotherUser._id.toString())

      const cardsAtStart = await helper.cardsInDb()
      const cardToDelete = cardsAtStart[0]

      await api
        .delete(`/api/cards/${cardToDelete.id}`)
        .set('Authorization', `Bearer ${anotherToken}`)
        .expect(401)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })

    test('fails with status code 404 if card does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api
        .delete(`/api/cards/${validNonexistingId}`)
        .set('Authorization', `Bearer ${testToken}`)
        .expect(404)

      const cardsAtEnd = await helper.cardsInDb()
      assert.strictEqual(cardsAtEnd.length, helper.initialCards.length)
    })
  })

  after(async () => {
    await mongoose.connection.close()
  })
})
