const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
  test('empty list returns null and zero', () => {
    const [author, count] = mostLikes([])
    expect(author).toBe(null)
    expect(count).toBe(0)
  })

  test('single blog', () => {
    const singleBlog = require('./test_helper').singleBlog
    const [author, count] = mostLikes(singleBlog)
    expect(author).toBe(singleBlog[0].author)
    expect(count).toBe(singleBlog[0].likes)
  })

  test('multiple blogs', () => {
    const multipleBlogs = require('./test_helper').multipleBlogs
    const [author, count] = mostLikes(multipleBlogs)
    expect(author).toBe('Edsger W. Dijkstra')
    expect(count).toBe(17)
  })
})
