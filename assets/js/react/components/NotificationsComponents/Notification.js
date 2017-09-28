import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import _ from 'lodash'
import Colors from '../../styles/colorScheme'
import icon from './assets/mageland_icon.png'

const Notification = ({notification, onDelete, onDismiss}) => (
  <div>
    <li style={Object.assign({}, listItem, !notification.dismissed ? {backgroundColor: Colors.lightBlue} : null)}>
      <div style={{display: 'flex'}}>
        <img src={icon} alt='action' width='40' height='40' />
        <h5 style={{flexGrow: 1, paddingLeft: '15px', marginTop: 0}}>{notification.title}</h5>
      </div>
      <div style={time}>{getTime(notification.createdAt)}</div>
      <div style={buttonGroup}>
        <button onClick={() => onDelete(notification.id)} style={Object.assign({}, button, {backgroundColor: Colors.orange, marginRight: '2px'})}>Supprimer</button>
        <div style={switchButton}>
          <div className='switch-label' style={{marginBottom: 0}}>
            <div className='before' style={notification.dismissed ? beforeActive : before}>&nbsp;</div>
            {notification.dismissed ? <span className='toggle--on' style={readLabel}>Lu</span> : <span className='toggle--off' style={unreadLabel}>Non lu</span>}
            <div className='after' style={notification.dismissed ? afterActive : after}>&nbsp;</div>
          </div>
          <button onClick={() => onDismiss(notification.id)} style={{...button, ...{position: 'absolute', background: 'none', border: 'none', width: '100%', height: '100%'}}}>&nbsp;</button>
        </div>
      </div>
    </li>
  </div>
)

Notification.propTypes = {
  notification: PropTypes.object,
  onDelete: PropTypes.func,
  onDismiss: PropTypes.func
}

const getTime = (time) => {
  moment.locale('fr')
  return _.upperFirst(moment(time).fromNow())
}

const time = {
  display: 'block',
  fontSize: '10px',
  color: '#2b2b2b',
  marginTop: '-9px'
}

const listItem = {
  padding: '9px 15px'
}

const buttonGroup = {
  display: 'flex'
}

const button = {
  width: '50%',
  height: '27px',
  border: 'none',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  borderRadius: '2px'
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
  left: 0,
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
  left: 'calc(100% - 5px)',
  transform: 'translate(-100%, -50%)'
}

const readLabel = {
  textAlign: 'left',
  width: 'calc(100% - 16px)',
  display: 'block',
  position: 'absolute',
  left: '8px',
  top: '52%',
  transform: 'translateY(-50%)'
}

const unreadLabel = {
  textAlign: 'right',
  width: 'calc(100% - 16px)',
  display: 'block',
  position: 'absolute',
  top: '52%',
  transform: 'translateY(-50%)',
  right: '8px',
  color: '#333'
}

const switchButton = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '50%',
  padding: 0,
  margin: 0,
  border: 'none',
  height: '27px',
  cursor: 'pointer',
  fontWeight: 500,
  textAlign: 'left',
  color: '#999',
  backgroundColor: 'transparent',
  marginLeft: '2px'
}

export default Notification
