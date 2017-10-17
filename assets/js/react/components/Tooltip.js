// @flow
/**
 * TODO under development
 */
import React from 'react'

type Props = {
  message: string,
  display: boolean
}

const processMessage = (message) => {
  return Array.isArray(message) ? message.join(', ') : message
}

const Tooltip = ({message, display}: Props) => (
  <div style={display ? visible : hidden}>
    <div className='before' style={before}>&nbsp;</div>
    <div style={{position: 'relative'}}>{processMessage(message)}</div>
  </div>
)

const tooltip = {
  color: '#fff',
  fontSize: '12px',
  backgroundColor: '#111',
  borderRadius: '2px',
  display: 'block',
  padding: '4px 6px',
  position: 'absolute',
  top: 'calc(100% + 10px)',
  left: '50%',
  transform: 'translateX(-50%)',
  maxWidth: '200px',
  whiteSpace: 'initial',
  zIndex: 1001
}

const visible = {
  ...tooltip,
  display: 'block',
  opacity: 1
}

const hidden = {
  ...tooltip,
  display: 'none',
  opacity: 0
}

const before = {
  position: 'absolute',
  backgroundColor: '#111',
  top: '-4px',
  left: '50%',
  width: '8px',
  height: '8px',
  transform: 'translateX(-50%) rotate(-45deg)'
}

export default Tooltip
