// @flow
import React from 'react'

type Props = {
  text: string
}

type State = {
  text: string
}

class Buttons extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      text: ''
    }
  }

  componentWillMount () {
    this.setData.bind(this)
  }

  setData () {
    this.setState({
      text: this.props.text
    })
  }

  actionClick () {
    this.setState({
      text: 'coucou'
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
