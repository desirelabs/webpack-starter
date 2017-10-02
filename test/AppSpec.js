import test from 'tape'
import React from 'react'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-15'

import App from '../assets/js/react/App'

configure({ adapter: new Adapter() })

test('shallow', (t) => {
  const wrapper = shallow(<App />)
  t.equal(wrapper.contains(<h1>Hello !</h1>), true)
  t.end()
})
