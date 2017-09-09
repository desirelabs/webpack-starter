import React from 'react'
import ReactDOM from 'react-dom'
import App from './react/App'

let root = document.querySelector('#root')
if (root) {
  ReactDOM.render(
    <App />,
    root
  )
}
