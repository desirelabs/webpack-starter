import React from 'react'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import NotificationsList from './NotificationsList'

configure({adapter: new Adapter()})

describe('Testing NotificationsList Component', () => {
  /**
   * Snapshot
   */
  test('Should display', () => {
    const notifications = []
    const mock = jest.fn()
    const wrapper = renderer.create(<NotificationsList notifications={notifications} onDelete={mock} onDismiss={mock} onNotifClick={mock} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
