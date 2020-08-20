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
    expect(result).toEqual(expect.objectContaining({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    }))
  })
})