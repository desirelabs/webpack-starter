import React from 'react'
import { configure, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import Notification from './Notification'

configure({adapter: new Adapter()})

describe('Testing Notification Component', () => {
  /**
   * Snapshot
   */
  test('Should display', () => {
    const notification = {
      id: 1,
      title: 'title',
      dismissed: false,
      createdAt: new Date().now
    }
    const mock = jest.fn()
    const wrapper = renderer.create(<Notification notification={notification} onDelete={mock} onDismiss={mock} onNotifClick={mock} />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * Title click
   */
  test('Click on title should trigger callback', () => {
    const notification = {
      id: 1,
      title: 'title',
      dismissed: false,
      createdAt: new Date().now
    }
    const mock = jest.fn()
    const wrapper = shallow(<Notification notification={notification} onDelete={mock} onDismiss={mock} onNotifClick={mock} />)
    wrapper.find('a').simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  /**
   * Delete Button click
   */
  test('Click on delete button should trigger callback', () => {
    const notification = {
      id: 1,
      title: 'title',
      dismissed: false,
      createdAt: new Date().now
    }
    const mock = jest.fn()
    const wrapper = shallow(<Notification notification={notification} onDelete={mock} onDismiss={mock} onNotifClick={mock} />)
    wrapper.find('button').first().simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  /**
   * Button click
   */
  test('Click on button should trigger callback', () => {
    const notification = {
      id: 1,
      title: 'title',
      dismissed: false,
      createdAt: new Date().now
    }
    const mock = jest.fn()
    const wrapper = shallow(<Notification notification={notification} onDelete={mock} onDismiss={mock} onNotifClick={mock} />)
    wrapper.find('.switch-label').simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  /**
   * Title is set
   */
  test('Title is set properly', () => {
    const notification = {
      id: 1,
      title: 'title',
      dismissed: false,
      createdAt: new Date().now
    }
    const mock = jest.fn()
    const wrapper = shallow(<Notification notification={notification} onDelete={mock} onDismiss={mock} onNotifClick={mock} />)
    expect(wrapper.find('h5').text()).toBe(notification.title)
  })
})
