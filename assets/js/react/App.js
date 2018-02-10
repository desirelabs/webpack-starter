// @flow
import React from 'react'

type Props = {
  name: string
}

const App = ({name}: Props) => (
  <div style={style}>
    <h1>Hello {name}!</h1>
  </div>
)

const style = {
  display: 'flex',
  flexFlow: 'column nowrap',
  alignItems: 'center'
}

export default App
