// @flow
import React from 'react'

type Props = {
  value: boolean,
  onChange: Function
}

const Switch = ({value, onChange}: Props) => (
  <div style={switchButton}>
    <input type='checkbox' id='id-name--1' name='set-name' style={input} checked={value} onChange={onChange} />
    <label htmlFor='id-name--1' className='switch-label' style={{marginBottom: 0}}>
      <div className='before' style={value ? beforeActive : before}>&nbsp;</div>
      {value ? <span className='toggle--on'>Avancé</span> : <span className='toggle--off'>Simple</span>}
      <div className='after' style={value ? afterActive : after}>&nbsp;</div>
    </label>
  </div>
)

const input = {
  position: 'absolute',
  left: '-9999px'
}

const beforeAfter = {
  content: '',
  position: 'absolute',
  margin: 0,
  outline: 0,
  top: '50%',
  transform: 'translate(0, -50%)',
  transition: 'all 0.3s ease'
}

const before = {
  ...beforeAfter,
  left: '1px',
  width: '34px',
  height: '14px',
  backgroundColor: '#9E9E9E',
  borderRadius: '8px'
}

const after = {
  ...beforeAfter,
  left: 0,
  width: '20px',
  height: '20px',
  backgroundColor: '#FAFAFA',
  borderRadius: '50%',
  boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084)'
}

const beforeActive = {
  ...before,
  backgroundColor: '#cecece'
}

const afterActive = {
  ...after,
  backgroundColor: '#4CAF50',
  transform: 'translate(80%, -50%)'
}

const switchButton = {
  position: 'relative',
  display: 'inline-block',
  minWidth: '112px',
  cursor: 'pointer',
  fontWeight: 500,
  textAlign: 'left',
  padding: '0 0 0 44px',
  color: '#fff'
}

export default Switch
