
import React from 'react'
import App from '../assets/js/react/App'
import Adapter from 'enzyme-adapter-react-15'
import { configure, mount, shallow } from 'enzyme'

configure({ adapter: new Adapter() })

describe('App', () => {
  // Component's Boilerplate
  let props
  let mountedApp
  const app = () => {
    if (mountedApp) {
      mountedApp = mount(<App {...props} />)
    }
    return mountedApp
  }

  beforeEach(() => {
    props = {
      name: undefined
    }
    mountedApp = undefined
  })

  // Tests
  it('Always render a title tag h1', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.length).toBeGreaterThan(0)
  })

  it('Expects title tag content to exist', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().length).toBeGreaterThan(0)
  })

  it('Expects title tag content to contain `Hello`', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().indexOf('Hello')).toBeGreaterThan(-1)
  })

  it('Expects title tag content to contain `React`', () => {
    const wrapper = mount(<App />)
    const title = wrapper.find('h1')
    expect(title.text().indexOf('React')).toBeGreaterThan(-1)
  })
})
