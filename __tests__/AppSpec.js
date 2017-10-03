import React from 'react'
import App from '../assets/js/react/App'
import renderer from 'react-test-renderer'

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <App name='React' />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
