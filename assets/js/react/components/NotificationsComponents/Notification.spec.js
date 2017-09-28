import React from 'react'
import { shallow } from 'enzyme'
import Notification from './Notification'

it('Should display', () => {
  const notification = shallow(
    <Notification notification={{dismissed: false}} />
  )
  expect(notification.props().notification).toBe('object')
})