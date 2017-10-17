// @flow
import React from 'react'
import Radium from 'radium'
import moment from 'moment'
import _ from 'lodash'
import Colors from '../../styles/colorScheme'

type notification = {
  createdAt: string,
  dismissed: boolean,
  id: number,
  routeName: string,
  routeVars: Object,
  title: string
}

type Props = {
  notification: notification,
  onDelete: Function,
  onDismiss: Function,
  onNotifClick: Function
}

@Radium
class Notification extends React.Component<Props> {
  render () {
    return (
      <div>
        <li style={Object.assign({}, listItem, !this.props.notification.dismissed ? {backgroundColor: Colors.lightBlue} : null)}>
          <a onClick={() => this.props.onNotifClick(this.props.notification.id)} style={{cursor: 'pointer'}}>
            <h5 style={{flexGrow: 1, marginTop: 0}}>{this.props.notification.title}</h5>
          </a>
          <div style={time}>{getTime(this.props.notification.createdAt)}</div>
          <div style={buttonGroup}>
            <button key='delete-button' onClick={() => this.props.onDelete(this.props.notification.id)} style={Object.assign({}, button, {margin: '0 2px 0 0'})}>Supprimer</button>
            <div style={switchButton}>
              <button onClick={() => this.props.onDismiss(this.props.notification.id)} className='switch-label' style={this.props.notification.dismissed ? toggleOn : toggleOff}>
                {this.props.notification.dismissed ? <span className='toggle--on' style={readLabel}>Lu</span> : <span className='toggle--off' style={unreadLabel}>Non lu</span>}
                <div className='after' style={this.props.notification.dismissed ? afterActive : after}>&nbsp;</div>
              </button>
            </div>
          </div>
        </li>
      </div>
    )
  }
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
  paddingTop: '5px',
  paddingBottom: '5px',
  display: 'flex',
  justifyContent: 'space-between'
}

const button = {
  width: '82px',
  height: '27px',
  border: 'none',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  borderRadius: '2px',
  transition: 'background-color 0.15s linear',
  backgroundColor: Colors.orange,
  ':hover': {
    backgroundColor: Colors.darkOrange
  }
}

const toggleButton = {
  width: '82px',
  height: '27px',
  border: 'none',
  textAlign: 'center',
  color: '#fff',
  outline: 'none',
  borderRadius: '2px',
  position: 'absolute'
}

const toggleOn = {
  ...toggleButton,
  transition: 'background-color 0.15s linear',
  backgroundColor: Colors.green,
  ':hover': {
    backgroundColor: Colors.darkGreen
  }
}

const toggleOff = {
  ...toggleButton,
  transition: 'background-color 0.15s linear',
  backgroundColor: Colors.red,
  ':hover': {
    backgroundColor: Colors.darkRed
  }
}

const beforeAfter = {
  content: '',
  position: 'absolute',
  margin: 0,
  outline: 0,
  top: '1px',
  transition: 'all 0.3s ease'
}

const after = {
  ...beforeAfter,
  left: '1px',
  width: '16px',
  height: '25px',
  backgroundColor: '#FAFAFA',
  borderRadius: '2px',
  boxShadow: '0 3px 1px -2px rgba(0, 0, 0, 0.14), 0 2px 2px 0 rgba(0, 0, 0, 0.098), 0 1px 5px 0 rgba(0, 0, 0, 0.084)'
}

const afterActive = {
  ...after,
  backgroundColor: '#fafafa',
  left: 'calc(100% - 1px)',
  transform: 'translate(-100%, 0)'
}

const readLabel = {
  textAlign: 'center',
  width: 'calc(100% - 16px)',
  display: 'block',
  position: 'absolute',
  left: 0,
  right: '16px',
  top: '52%',
  transform: 'translateY(-50%)',
  color: '#fff'
}

const unreadLabel = {
  textAlign: 'center',
  width: 'calc(100% - 16px)',
  display: 'block',
  position: 'absolute',
  top: '52%',
  transform: 'translateY(-50%)',
  right: 0,
  left: '16px',
  color: '#fff'
}

const switchButton = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  width: '82px',
  padding: 0,
  margin: '0 2px 0 0',
  border: 'none',
  height: '27px',
  cursor: 'pointer',
  fontWeight: 500,
  textAlign: 'left',
  color: '#999',
  backgroundColor: 'transparent'
}

export default Notification
