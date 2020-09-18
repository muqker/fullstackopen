import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogEntry from './BlogEntry'

describe('BlogEntry', () => {
  let component = null
  const handleDeleteBlog = jest.fn()
  const handleLikeBlog = jest.fn()
  const blog = {
    title: 'So much title',
    author: 'Internet Orange Dog',
    url: 'https://example.com/wow/dog',
    likes: 123,
    user: {
      username: 'dodge'
    }
  }

  beforeEach(() => {
    component = render(
      <BlogEntry blog={blog} handleDeleteBlog={handleDeleteBlog} handleLikeBlog={handleLikeBlog} username={blog.user.username} />
    )
  })

  const times = (n, f) => {
    while (n-- > 0)
      f()
  }

  test('initial visibility', () => {
    expect(component.getByText(blog.title)).toBeVisible()
    expect(component.getByText(blog.author)).toBeVisible()
    expect(component.getByText(blog.url)).not.toBeVisible()
    expect(component.getByText(`${blog.likes}`)).not.toBeVisible()
  })

  test('after view is pressed', () => {
    fireEvent.click(component.getByText('view'))
    expect(component.getByText(blog.title)).toBeVisible()
    expect(component.getByText(blog.author)).toBeVisible()
    expect(component.getByText(blog.url)).toBeVisible()
    expect(component.getByText(`${blog.likes}`)).toBeVisible()
  })

  test('press likes a few times', () => {
    const repeats = 2
    times(repeats, () => {
      fireEvent.click(component.getByText('like'))
    })
    expect(handleLikeBlog.mock.calls).toHaveLength(repeats)
  })
})
