import React from 'react'

import Button from './Button'
import Tick from './Tick'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
      people: {},
      count: 0
    }

    this.setData = this.setData.bind(this)
  }

  isOdd (value) {
    return value % 2 === 0
  }

  componentWillMount () {
    this.setData()
  }

  setData () {
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
      <div>
        <h1>Hello {this.state.name}!</h1>
        <Tick count={this.state.count} />
        <Button text={'Ajouter'} actionClick={() => this.add()} />
        <Button text={'Supprimer'} actionClick={() => this.remove()} />
      </div>
    )
  }
}
// eslint-disable-next-line
const style = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center'
}

export default App
