// @flow
import React from 'react'
import Notification from './Notification'

type notification = {
  createdAt: string,
  dismissed: boolean,
  id: number,
  routeName: string,
  routeVars: Object,
  title: string
}

type Props = {
  notifications: Array<notification>,
  onDelete: Function,
  onDismiss: Function,
  onNotifClick: Function
}

const NotificationsList = ({notifications, onDelete, onDismiss, onNotifClick}: Props) => (
  <ul style={list}>
    {notifications.map((notification, key) => (
      <Notification notification={notification} onDelete={onDelete} onDismiss={onDismiss} onNotifClick={onNotifClick} key={key} />
    ))}
  </ul>
)

const list = {
  width: '300px',
  height: '525px',
  overflowY: 'scroll',
  paddingLeft: 0,
  listStyle: 'none'
}

export default NotificationsList
