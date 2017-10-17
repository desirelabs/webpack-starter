import React from 'react'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import NotificationsHeader from './NotificationsHeader'

configure({adapter: new Adapter()})

describe('Testing Notifications Header Component', () => {
  /**
   * Snapshot
   */
  test('Should display', () => {
    const wrapper = renderer.create(<NotificationsHeader count={1} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * Count should have a value
   */
  test('Count should have a value', () => {
    const wrapper = shallow(<NotificationsHeader count={1} />)
    expect(wrapper.instance().props.count).toBeGreaterThan(0)
  })

  /**
   * Count should be a number
   */
  test('Count should be a number', () => {
    const wrapper = shallow(<NotificationsHeader count={1} />)
    expect(typeof wrapper.instance().props.count).toBe('number')
  })
})
