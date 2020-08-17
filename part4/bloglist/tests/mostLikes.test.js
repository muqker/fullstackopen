const mostLikes = require('../utils/list_helper').mostLikes

describe('most likes', () => {
  test('empty list returns null and zero', () => {
    const [author, count] = mostLikes([])
    expect(author).toBe(null)
    expect(count).toBe(0)
  })

  test('single blog', () => {
    const singleBlog = require('./blogs.data').singleBlog
    const [author, count] = mostLikes(singleBlog)
    expect(author).toBe('Edsger W. Dijkstra')
    expect(count).toBe(5)
  })

  test('multiple blogs', () => {
    const multipleBlogs = require('./blogs.data').multipleBlogs
    const [author, count] = mostLikes(multipleBlogs)
    expect(author).toBe('Edsger W. Dijkstra')
    expect(count).toBe(17)
  })
})
