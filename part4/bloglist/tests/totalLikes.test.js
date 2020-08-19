const totalLikes = require('../utils/list_helper').totalLikes

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const singleBlog = require('./test_helper').singleBlog
    const result = totalLikes(singleBlog)
    expect(result).toBe(singleBlog[0].likes)
  })

  test('of a bigger list is calculated right', () => {
    const multipleBlogs = require('./test_helper').multipleBlogs
    const result = totalLikes(multipleBlogs)
    expect(result).toBe(36)
  })
})
