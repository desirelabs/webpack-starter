import React from 'react'
import PropTypes from 'prop-types'

const SwitchButton = ({value, onUpdate}) => (
  <button style={switchButton} onClick={() => onDismiss(notification.id)}>
    <label htmlFor='id-name--1' className='switch-label' style={{marginBottom: 0}}>
      <div className='before' style={value ? beforeActive : before}>&nbsp;</div>
      {value ? <span className='toggle--on' style={readLabel}>Lu</span> : <span className='toggle--off' style={unreadLabel}>Non lu</span>}
      <div className='after' style={value ? afterActive : after}>&nbsp;</div>
    </label>
  </button>
)

SwitchButton.propTypes = {
  value: PropTypes.bool,
  onUpdate: PropTypes.func
}

const beforeAfter = {
  content: '',
  position: 'absolute',
  margin: 0,
  outline: 0,
  top: '50%',
  transform: 'translate(5px, -50%)',
  transition: 'all 0.3s ease'
}

const before = {
  ...beforeAfter,
  left: '1px',
  width: '100%',
  height: '27px',
  backgroundColor: '#9E9E9E',
  borderRadius: '2px'
}

const after = {
  ...beforeAfter,
  left: '5px',
  width: '45%',
  height: '20px',
  backgroundColor: '#FAFAFA',
  borderRadius: '2px',
  boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084)'
}

const beforeActive = {
  ...before,
  backgroundColor: '#cecece'
}

const afterActive = {
  ...after,
  backgroundColor: '#4CAF50',
  left: '101%',
  transform: 'translate(-100%, -50%)'
}

const readLabel = {
  textAlign: 'left',
  width: '100%',
  display: 'block',
  position: 'absolute',
  left: '15px',
  top: '52%',
  transform: 'translateY(-50%)'
}

const unreadLabel = {
  textAlign: 'right',
  width: '100%',
  display: 'block',
  position: 'absolute',
  top: '52%',
  transform: 'translateY(-50%)',
  right: '3px',
  color: '#333'
}

const switchButton = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  minWidth: '112px',
  maxWidth: '50%',
  height: '27px',
  cursor: 'pointer',
  fontWeight: 500,
  textAlign: 'left',
  padding: '0 0 0 44px',
  color: '#999'
}

export default SwitchButton
