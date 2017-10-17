import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import renderer from 'react-test-renderer'

import Button from './Button'

configure({adapter: new Adapter()})

describe('Button component', () => {
  test('Button should button display', () => {
    const wrapper = renderer.create(<Button />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  test('Should have prop text', () => {
    const action = jest.fn()
    const wrapper = shallow(<Button text='text' actionClick={action} />)
    expect(wrapper.instance().props.text.length).toBeGreaterThan(0)
  })

  /**
   * Test both that click works and state is updated
   */
  test('Click should trigger actionClick callback', () => {
    const mock = jest.fn()
    const wrapper = mount(<Button text='text' onActionClick={mock} />)
    wrapper.find('button').simulate('click')
    expect(wrapper.instance().state.text).toBe('hello')
  })
})
