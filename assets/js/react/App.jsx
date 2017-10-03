import React from 'react'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      people: {}
    }

    this.setData = this.setData.bind(this)
  }

  componentWillMount () {
    this.setData()
  }

  setData () {
    this.setState({
      name: 'React'
    })
  }

  render () {
    return (
      <h1>Hello {this.state.name}!</h1>
    )
  }
}

export default App
