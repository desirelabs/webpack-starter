// @flow
import React from 'react'

type Props = {}
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

  setData = () => {
    /* set the state */
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
