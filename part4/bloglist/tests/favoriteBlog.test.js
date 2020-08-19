const favoriteBlog = require('../utils/list_helper').favoriteBlog

describe('favorite blog', () => {
  test('empty list returns null', () => {
    const result = favoriteBlog([])
    expect(result).toBe(null)
  })

  test('single blog returns that blog', () => {
    const singleBlog = require('./test_helper').singleBlog
    const result = favoriteBlog(singleBlog)
    expect(result).toEqual(singleBlog[0])
  })

  test('multiple blogs works correctly', () => {
    const multipleBlogs = require('./test_helper').multipleBlogs
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