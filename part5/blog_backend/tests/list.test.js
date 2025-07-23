const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_herlper')

describe('dummy', () => {

  test ('dummy returns one' , () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })
})

describe('Total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  const listWithManyBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  ]

  test ('when list has many blogs, equals the sum of likes', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    assert.strictEqual(result, 24)
  })
})

describe('Favorite blog', () => {

  const listBlogs = [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
  ]

  test ('return the blog with most likes ', () => {
    const result = listHelper.favoriteBlog(listBlogs)
    assert.deepEqual(result, {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    })
  })

  test ('empty list return null', () => {
    const result = listHelper.favoriteBlog([])
    assert.deepEqual(result, null)
  })

  test ('when list has only one blog return that one', () => {
    const blog = [listBlogs[0]]
    const result = listHelper.favoriteBlog(blog)
    assert.deepEqual(result, {
      title: 'React patterns',
      author: 'Michael Chan',
      likes: 7
    })
  })
})