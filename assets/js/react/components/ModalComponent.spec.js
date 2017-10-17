import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import Modal from './ModalComponent'

configure({adapter: new Adapter()})

describe('Testing ModalComponent', () => {
  // Component should display
  test('Should display', () => {
    const wrapper = renderer.create(<Modal />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  // Should trigger function on cancel
  test('Should on cancel being called', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    wrapper.find('.btn-cancel').simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  // Should trigger function on confirm
  test('Should on confirm being called', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    wrapper.find('.btn-confirm').simulate('click')
    expect(mock).toHaveBeenCalled()
  })

  // Header message should not be string and not be empty
  test('Header message should not be empty', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    expect(wrapper.instance().props.headerMessage).toBe('header message')
  })

  // Body message should not be string and not be empty
  test('Body message should not be empty', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    expect(wrapper.instance().props.bodyMessage).toBe('body message')
  })

  // showModal should be truthy
  test('showModal should be truthy', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    expect(wrapper.instance().props.showModal).toBeTruthy()
  })

  // showModal should be falsy
  test('showModal should be falsy', () => {
    const mock = jest.fn()
    const wrapper = shallow(<Modal showModal={false} headerMessage='header message' bodyMessage='body message' onCancel={mock} onConfirm={mock} />)
    expect(wrapper.instance().props.showModal).toBeFalsy()
  })
})
