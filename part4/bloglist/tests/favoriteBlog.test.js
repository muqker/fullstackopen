const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
  test('empty list returns null', () => {
    const result = favoriteBlog([])
    expect(result).toBe(null)
  })

  test('single blog returns that blog', () => {
    const singleBlog = require('./blogs.data').singleBlog
    const result = favoriteBlog(singleBlog)
    expect(result).toEqual({
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    })
  })

  test('multiple blogs works correctly', () => {
    const multipleBlogs = require('./blogs.data').multipleBlogs
    const result = favoriteBlog(multipleBlogs)
    expect(result).toEqual({
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })
})