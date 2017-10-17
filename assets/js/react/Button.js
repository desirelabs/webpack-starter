import React from 'react'

class Buttons extends React.Component {
  constructor () {
    super()
    this.state = {
      text: ''
    }

    this.setData = this.setData.bind(this)
  }

  componentWillMount () {
    // this.setData()
  }

  setData () {
    this.setState({
      text: this.props.text
    })
  }

  actionClick () {
    this.setState({
      text: 'hello'
    })
  }

  render () {
    return (
      <div>
        <button onClick={() => this.actionClick()}>{this.state.text}</button>
      </div>
    )
  }
}

export default Buttons
