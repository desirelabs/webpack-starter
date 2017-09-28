// @flow
import React from 'react'

type Props = {
  name: string
}

type State = {
  name: string
}

class App extends React.Component<Props, State> {
  render () {
    return (
      <h1>Hello {this.props.name}, {this.state.name}!</h1>
    )
  }
}

export default App
