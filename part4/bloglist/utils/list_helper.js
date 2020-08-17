// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => 
  blogs
    .map(blog => blog.likes)
    .reduce((a, b) => a + b, 0)

const favoriteBlog = (blogs) =>
  blogs.reduce((a, b) => a && a.likes > b.likes ? a : b, null)

const countAuthorStat = (authors, blog, stat) => {
  authors[blog.author] = stat(blog) + (authors[blog.author] || 0)
}

const countAuthorBlogs = (authors, blog) => {
  countAuthorStat(authors, blog, () => 1)
}

const countAuthorLikes = (authors, blog) => {
  countAuthorStat(authors, blog, (blog) => blog.likes)
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0)
    return  [null, 0]
  else {
    let authors = {}
    blogs.forEach((blog) => countAuthorBlogs(authors, blog))
    const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
    return [author, authors[author]]
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0)
    return [null, 0]
  else {
    let authors = {}
    blogs.forEach((blog) => countAuthorLikes(authors, blog))
    const author = Object.keys(authors).reduce((a, b) => authors[a] > authors[b] ? a : b)
    return [author, authors[author]]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
