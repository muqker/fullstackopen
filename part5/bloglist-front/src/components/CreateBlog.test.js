import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CreateBlog from './CreateBlog'

describe('CreateBlog', () => {
  test('submit create blog form', () => {
    const handleCreateBlog = jest.fn()
    const blog = {
      title: 'So much title',
      author: 'Internet Orange Dog',
      url: 'https://example.com/wow/dog',
      likes: 123,
      user: {
        username: 'dodge'
      }
    }

    const component = render(
      <CreateBlog handleCreateBlog={handleCreateBlog} />
    )

    fireEvent.change(component.container.querySelector('input#title'), { target: { value: blog.title } })
    fireEvent.change(component.container.querySelector('input#author'), { target: { value: blog.author } })
    fireEvent.change(component.container.querySelector('input#url'), { target: { value: blog.url } })
    fireEvent.submit(component.container.querySelector('form'))

    expect(handleCreateBlog.mock.calls).toHaveLength(1)
    expect(handleCreateBlog.mock.calls[0][0].title).toBe(blog.title)
    expect(handleCreateBlog.mock.calls[0][0].author).toBe(blog.author)
    expect(handleCreateBlog.mock.calls[0][0].url).toBe(blog.url)
  })
})