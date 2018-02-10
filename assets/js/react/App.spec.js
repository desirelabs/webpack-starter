
import React from 'react'
import App from './App'
import renderer from 'react-test-renderer'

describe('App', () => {
  /**
   * Snapshot testing
   */
  test('Should render', () => {
    const wrapper = renderer.create(<App />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
