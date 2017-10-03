
import React from 'react'
import App from '../assets/js/react/App'
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
    props = {
      name: undefined
    }
    mountedApp = undefined
  })

  /**
   * Snapshot testing
   */
  it('Should render', () => {
    const wrapper = renderer.create(<App />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })

  /**
   * Html testing
   */
  it('Always render a title tag h1', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.length).toBe(1)
  })

  /**
   * Html content text testing
   */
  it('Expects title tag content to exist', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().length).toBeGreaterThan(0)
  })

  /**
   * Html string testing
   */
  it('Expects title tag content to contain `Hello`', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().indexOf('Hello')).toBeGreaterThan(-1)
  })

  /**
   * Html string from state testing
   */
  it('Expects title tag content to contain `React`', () => {
    const wrapper = shallow(<App />)
    const title = wrapper.find('h1')
    expect(title.text().indexOf('React')).toBeGreaterThan(-1)
  })

  /**
   * State testing
   */
  it('Should update state', () => {
    const wrapper = mount(<App />)
    wrapper.instance().setData()
    expect(wrapper.state('name')).toEqual('React')
  })
})
