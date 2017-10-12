import React from 'react'
import renderer from 'react-test-renderer'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'
import Button from './Button'

configure({adapter: new Adapter()})

describe('Button', () => {
  test('Should display button', () => {
    const mock = jest.fn()
    const button = renderer.create(<Button text='text' actionClick={mock} />).toJSON()
    expect(button).toMatchSnapshot()
  })

  test('Button text should be "toto"', () => {
    const wrapper = mount(<Button text={'toto'} />)
    expect(wrapper.prop('text')).toBe('toto')
  })

  test('Button method setData sets state with text from props', () => {
    const wrapper = mount(<Button text={'toto'} />)
    wrapper.instance().setData()
    expect(wrapper.state('text')).toBe('toto')
  })

  test('Button method actionClick modifies state text with coucou', () => {
    const wrapper = mount(<Button text={'toto'} />)
    wrapper.find('button').simulate('click')
    expect(wrapper.state('text')).toBe('coucou')
  })

  test('Button text length should not be 0', () => {
    const wrapper = mount(<Button text={'toto'} />)
    expect(wrapper.prop('text').length).toBeGreaterThan(0)
  })
})
