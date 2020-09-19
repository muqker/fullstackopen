// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('newUser', (user) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/users',
    body: {
      username: user.username,
      password: user.password,
      name: user.name
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/login',
    body: {
      username: username,
      password: password,
    }
  }).then((response) => {
    localStorage.setItem('loginAuthorization', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('newBlog', (blog) => {
  cy.request({
    method: 'POST',
    url: 'http://localhost:3003/api/blogs',
    body: blog,
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loginAuthorization')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})

Cypress.Commands.add('addLikes', (blog, likes) => {
  cy.request({
    method: 'PUT',
    url: 'http://localhost:3003/api/blogs',
    body: {
      ...blog,
      likes: likes
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loginAuthorization')).token}`
    }
  })
  cy.visit('http://localhost:3000')
})
