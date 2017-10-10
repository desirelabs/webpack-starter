// @flow
import React from 'react'

import Button from './Button'
import Tick from './Tick'

type Props = {}

type State = {
  name: string,
  people: Object,
  count: number
}

class App extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      name: '',
      people: {},
      count: 0
    }
  }

  isOdd (value: number) {
    return value % 2 === 0
  }

  componentWillMount () {
    this.setData.bind(this)('test')
  }

  setData (str: string) {
    console.log(str)
    this.setState({
      name: 'React'
    })
  }

  add () {
    this.setState({
      count: this.state.count + 1
    })
  }

  remove () {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1
      })
    }
  }

  render () {
    return (
      <div style={style}>
        <h1>Hello {this.state.name}!</h1>
        <Tick count={this.state.count} />
        <Button text={'Ajouter'} actionClick={() => this.add()} />
        <Button text={'Supprimer'} actionClick={() => this.remove()} />
      </div>
    )
  }
}

const style = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center'
}

export default App
