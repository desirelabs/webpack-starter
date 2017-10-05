
import React from 'react'
import App from '../../assets/js/react/App'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'
import { configure, mount, shallow } from 'enzyme'

configure({ adapter: new Adapter() })

describe('App', () => {
  /**
   * Component's boilerplate
   */
  let props
  let mountedApp
  const app = () => {
    if (mountedApp) {
      mountedApp = mount(<App {...props} />)
    }
    return mountedApp
  }
  beforeEach(() => {
    props = undefined
    mountedApp = undefined
  })

  /**
   * Snapshot testing
   */
  test('Should render', () => {
    const wrapper = renderer.create(<App />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * Html testing
   */
  test('Always render a title tag h1', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title).toHaveLength(1)
  })

  /**
   * Html content text testing
   */
  test('Expects title tag content to exist', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().length).toBeGreaterThan(0)
  })

  /**
   * String contains
   */
  test('Expects title tag content to contain `Hello`', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text()).toEqual(expect.stringContaining('Hello'))
  })

  /**
   * Html string from state testing
   */
  test('Expects title tag content to contain `React`', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().indexOf('React')).toBeGreaterThan(-1)
  })

  /**
   * Testing state property value
   */
  test('Should update state', () => {
    const wrapper = mount(<App />)
    wrapper.instance().setData()
    expect(wrapper.state('name')).toEqual('React')
  })

  /**
   * Testing component's method
   */
  test('Should be odd', () => {
    const wrapper = mount(<App />)
    expect(wrapper.instance().isOdd(2)).toBeTruthy()
  })

  /**
   * Testing array to contain provided values
   */
  const array = ['Alice', 'Bob']
  test('Should array to contain all expected values', () => {
    expect(['Alice', 'Bob', 'Eve']).toEqual(expect.arrayContaining(array))
  })

  /**
   * Same as before with NOT
   */
  test('does not match if received does not contain expected elements', () => {
    expect(['Bob', 'Eve']).not.toEqual(expect.arrayContaining(array))
  })

  /**
   * Testing object to contain provided values
   */
  const object = {name: 'toto'}
  test('Should Object to contain all expected values', () => {
    expect({name: 'toto', age: 12}).toEqual(expect.objectContaining(object))
  })

  /**
   * Same as before with NOT
   */
  test('does not match if received does not contain expected elements', () => {
    expect({name: 'poney'}).not.toEqual(expect.objectContaining(object))
  })
})
