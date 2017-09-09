import React from 'react'
import PropTypes from 'prop-types'

class App extends React.Component {
  render () {
    return (
      <h1>Hello {this.props.name}!</h1>
    )
  }
}

App.propTypes = {
  name: PropTypes.string
}

export default App
