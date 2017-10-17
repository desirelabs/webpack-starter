import React from 'react'
import { configure, mount, shallow } from 'enzyme'
import renderer from 'react-test-renderer'
import Adapter from 'enzyme-adapter-react-15'

import StatisticsTops from './StatisticsTops'

configure({adapter: new Adapter()})

describe('Testing StatisticsTops', () => {
  // Component should display
  test('Should display', () => {
    global.Routing = { generate: function () { return true } }
    const wrapper = renderer.create(<StatisticsTops />).toJSON()
    expect(wrapper).toMatchSnapshot()
  })
})
