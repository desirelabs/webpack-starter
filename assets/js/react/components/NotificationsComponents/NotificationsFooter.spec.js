import React from 'react'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import NotificationsFooter from './NotificationsFooter'

configure({adapter: new Adapter()})

describe('Testing Notifications Footer Component', () => {
  /**
   * Snapshot
   */
  test('Should display', () => {
    const mock = jest.fn()
    const wrapper = renderer.create(<NotificationsFooter onDismissAll={mock} onDeleteAll={mock} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * First button click should trigger callback
   */
  test('First button click should trigger callback', () => {
    const mock = jest.fn()
    const wrapper = shallow(<NotificationsFooter onDismissAll={mock} onDeleteAll={mock} />)
    wrapper.find('button').at(0).simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  /**
   * Second button click should trigger callback
   */
  test('Second button click should trigger callback', () => {
    const mock = jest.fn()
    const wrapper = shallow(<NotificationsFooter onDismissAll={mock} onDeleteAll={mock} />)
    wrapper.find('button').at(1).simulate('click')
    expect(mock).toHaveBeenCalled()
  })
})
