import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

const NotificationsList = ({notifications, onDelete, onDismiss}) => (
  <ul style={list}>
    {notifications.map((notification, key) => (
      <Notification notification={notification} onDelete={onDelete} onDismiss={onDismiss} key={key} />
    ))}
  </ul>
)

NotificationsList.propTypes = {
  notifications: PropTypes.array,
  onDelete: PropTypes.func,
  onDismiss: PropTypes.func
}

const list = {
  width: '300px',
  height: '525px',
  overflowY: 'scroll',
  paddingLeft: 0,
  listStyle: 'none'
}

export default NotificationsList
