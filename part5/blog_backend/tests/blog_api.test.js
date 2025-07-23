const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app') // la aplicación Express
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
})

describe('API search test', () => {

  test('blogs are returned as json', async () => {

    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('the number of notes is the length of the list', async() => {
    
    const response = await helper.blogsInDB()
    
    assert.strictEqual(response.length, helper.initialBlogs.length)

  })

  test('unique identifier property of blog posts is named id', async () => {
  
    const response = await helper.blogsInDB()
    
    const blog = response[0]

    assert.ok(blog.id) //esta
    assert.strictEqual(blog._id, undefined) //no esta
  })
})

describe('API add test', () => {

  test('a valid blog can be added ',async() => {

    const newBlog = {
      title: 'Test...',
      author: 'Angelica Toro',
      url: 'https://localhost.com/',
      likes: 1
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAll = await helper.blogsInDB()

    assert.strictEqual(blogsAll.length, helper.initialBlogs.length + 1)

    const blogs = blogsAll.map(blog => blog.title)

    assert(blogs.includes('Test...'))

  })

  test('if likes property is missing, it defaults to 0', async () => {

    const newBlog = {
      title: 'Blog whitout likes',
      author: 'Angelica Toro',
      url: 'https://localhost.com/'
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
         
    const blogs = response.body
        
    assert.strictEqual(blogs.likes,0)

  })

  test('if title or url is missing, blog is not added and 400 is returned', async () => {

    const newBlogWithOutTitle = {
      author: 'Angelica Toro',
      url: 'https://localhost.com/'
    }

    const newBlogWithOutURL= {
      title: 'Missing URL',
      author: 'Angelica Toro'
    }

    const initialBlogs = await helper.blogsInDB()

    await api
      .post('/api/blogs')
      .send(newBlogWithOutTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .send(newBlogWithOutURL)
      .expect(400)
         
    const finalBlogs = await helper.blogsInDB()

    assert.strictEqual(finalBlogs.length, initialBlogs.length)

  })
})

describe('API delete test', () => { 

  test('a blog can be deleted', async() => {

    const blogsAll = await helper.blogsInDB()

    const blogToDelete = blogsAll[0] 
    console.log('Blog to delete: ', blogToDelete.title)
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAllAfterDelete = await helper.blogsInDB()

    const blogs = blogsAllAfterDelete.map(blog => blog.title)
    assert(!blogs.includes(blogToDelete.title))
      
    assert.strictEqual(blogsAllAfterDelete.length, helper.initialBlogs .length - 1)
  })
})

describe('API update test', () => { 

  test('the likes from a blog can be updated', async() => {

    const blogsAll = await helper.blogsInDB()

    const blogToUpdate = blogsAll[0] 
    console.log('Blog to update: ', blogToUpdate.title)
    
    const blogObject = {
      likes: 1
    }

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogObject)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const updateBlog = response.body

    assert.strictEqual(updateBlog.likes, 1)
    
  })
})

after(async () => {
  await mongoose.connection.close()
})