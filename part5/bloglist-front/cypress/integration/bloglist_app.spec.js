describe('BlogList App', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.newUser({
      username: 'testdud',
      password: 'testpassdud',
      name: 'Test Dud User'
    })
  })

  it('front page can be opened', function () {
    cy.contains('Welcome to our great BlogList cave')
  })

  describe('Login', function () {
    it('wrong login', function () {
      cy.get('#username').type('testdud')
      cy.get('#password').type('wrongpass')
      cy.get('#login').click()
      cy.get('.notification')
        .should('contain', 'login failed')
        .and('have.css', 'background-color', 'rgb(255, 192, 203)')
    })

    it('correct login', function () {
      cy.get('#username').type('testdud')
      cy.get('#password').type('testpassdud')
      cy.get('#login').type('click')
      cy.contains('testdud has logged in')
    })
  })

  describe('Once logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testdud', password: 'testpassdud' })
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('About the life of shrimps')
      cy.get('#author').type('Hungry Seagull')
      cy.get('#url').type('https://example.com/shrimp-me')
      cy.get('#create').click()
      cy.get('.notification').should('contain', 'a new blog')
      cy.contains('About the life of shrimps')
    })


    describe('Operations on posts', function () {
      beforeEach(function () {
        cy.newBlog({
          title: 'About the life of shrimps',
          author: 'Hungry Seagull',
          url: 'https://example.com/shrimp-me',
        })
        cy.get('.blog').contains('About the life of shrimps').parent().as('thePost')
      })

      it('like a blog', function () {
        cy.get('@thePost').find('#view').click()
        cy.get('#nblikes').should('contain', '0')
        cy.get('@thePost').find('#like').click()
        cy.get('@thePost').find('#like').click()
        cy.get('#nblikes').should('contain', '2')
      })

      it('remove a blog', function () {
        cy.get('@thePost').find('#view').click()
        cy.get('@thePost').find('#remove').click()
        cy.get('.blog').should('not.exist')
        cy.get('.notification').contains('blog deleted')
      })

      it('other user can not remove a blog', function () {
        const secondUser = {
          username: 'anothertestlad',
          password: 'secretpasscantguess',
          name: 'Test Lad User'
        }
        cy.newUser(secondUser)
        cy.login(secondUser)
        cy.get('@thePost').find('#view').click()
        cy.get('@thePost').find('#remove').should('not.exist')
      })

      it('sorted by likes', function () {
        const blog1 = {
          title: 'Blog with 10 likes',
          author: 'Hungry Seagull',
          url: 'https://example.com/shrimp-me',
          likes: 10
        }
        cy.newBlog(blog1)

        const blog2 = { ...blog1, title: 'Blog with 3 likes', likes: 3 }
        cy.newBlog(blog2)

        const blog3 = { ...blog1, title: 'Blog with 2 likes', likes: 2 }
        cy.newBlog(blog3)

        const expected = [10, 3, 2, 0]

        cy.get('.blog #nblikes').each((element, index) => {
          cy.wrap(element).should('contain', expected[index])
        })
      })
    })
  })
})
