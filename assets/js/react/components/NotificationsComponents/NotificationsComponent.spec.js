import React from 'react'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import NotificationsComponent from './NotificationsComponent'

configure({adapter: new Adapter()})

describe('Testing NotificationsComponent', () => {
  /**
   * This should call getNotifications
   */
  test('getNotifications should be called', () => {
    global.Routing = { generate: () => true }
    const getNotificationsMock = () => true
    let wrapper = shallow(<NotificationsComponent />)
    wrapper.getNotifications = getNotificationsMock
    expect(wrapper).toMatchSnapshot()
  })
})
