const multipleBlogs = [{
  title: 'React patterns',
  author: 'Michael Chan',
  url: 'https://reactpatterns.com/',
  likes: 7,
}, {
  title: 'Go To Statement Considered Harmful',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
  likes: 5,
}, {
  title: 'Canonical string reduction',
  author: 'Edsger W. Dijkstra',
  url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
  likes: 12,
}, {
  title: 'First class tests',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  likes: 10,
}, {
  title: 'TDD harms architecture',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
  likes: 0,
}, {
  title: 'Type wars',
  author: 'Robert C. Martin',
  url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
  likes: 2,
}]

const singleBlog = [{
  title: 'Monte Carlo forecasting in Scrum',
  author: 'Ian Mitchell',
  url: 'https://www.scrum.org/resources/blog/monte-carlo-forecasting-scrum',
  likes: 21,
}]

const multipleUsers = [{
  username: 'root',
  passwordHash: '---',
  name: 'Sys Admin'
}, {
  username: 'wheel',
  passwordHash: '---',
  name: 'Trusted Staff'
}, {
  username: 'guest',
  password: '123pass123',
  name: 'Hacker Boy'
}]

const singleUser = [{
  username: 'muqker',
  password: 'sneaky',
  name: 'Muqker Dude',
}]

module.exports = {
  multipleBlogs,
  singleBlog,
  multipleUsers,
  singleUser
}