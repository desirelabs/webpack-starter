import React from 'react'
import ReactDOM from 'react-dom'
import RootCloseWrapper from 'react-overlays/lib/RootCloseWrapper'
import ReactTooltip from 'react-tooltip'

export class CustomToggle extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (e) {
    e.preventDefault()
    this.props.onClick(e)
  }

  sanitize = (value) => {
    return Array.isArray(value) ? value.map(el => el.replace(', ', '')).join(', ') : value
  }

  render () {
    return (
      <div onClick={this.handleClick} style={{overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
        <button style={selectButton}>
          <div data-tip={this.sanitize(this.props.children)} style={text}>{this.props.children}</div>
          <i className='fa fa-caret-down' aria-hidden='true' style={icon} />
        </button>
        <ReactTooltip place='top' type='dark' effect='solid' />
      </div>
    )
  }
}

const selectButton = {
  outline: 'none',
  backgroundColor: '#fff',
  color: '#999',
  border: '1px solid #FB8C00',
  height: '50px',
  lineHeight: '100%',
  borderRadius: '2px',
  width: '100%',
  textAlign: 'left',
  zIndex: 'inherit',
  paddingRight: '25px'
}

const text = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 'normal'
}

const icon = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)'
}

export class CustomMenu extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.onChange = e => this.setState({value: e.target.value})
    this.state = {value: ''}
    this.handleRootClose = this.handleRootClose.bind(this)
  }

  handleRootClose (event) {
    this.props.onClose(event, {source: 'rootClose'})
  }

  focusNext () {
    const input = ReactDOM.findDOMNode(this.input)
    if (input) {
      input.focus()
    }
  }

  render () {
    const {value} = this.state
    const {
      children,
      open,
      rootCloseEvent
    } = this.props

    return (
      <RootCloseWrapper
        disabled={!open}
        onRootClose={this.handleRootClose}
        event={rootCloseEvent}
      >
        <div className='dropdown-menu' style={{padding: '', width: '100%', zIndex: 1000}}>
          <ul className='list-unstyled' style={{marginBottom: 0}}>
            {React.Children.toArray(children).filter(child => (
              !value.trim() || child.props.children.indexOf(value) !== -1
            ))}
          </ul>
        </div>
      </RootCloseWrapper>
    )
  }
}
