const mostBlogs = require('../utils/list_helper').mostBlogs

describe('most blogs', () => {
  test('empty list returns null and zero', () => {
    const [author, count] = mostBlogs([])
    expect(author).toBe(null)
    expect(count).toBe(0)
  })

  test('single blog', () => {
    const singleBlog = require('./test_helper').singleBlog
    const [author, count] = mostBlogs(singleBlog)
    expect(author).toBe(singleBlog[0].author)
    expect(count).toBe(1)
  })

  test('multiple blogs', () => {
    const multipleBlogs = require('./test_helper').multipleBlogs
    const [author, count] = mostBlogs(multipleBlogs)
    expect(author).toBe('Robert C. Martin')
    expect(count).toBe(3)
  })
})
