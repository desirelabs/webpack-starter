// @flow
import React from 'react'
import Colors from '../../styles/colorScheme'

type Props = {
  count: number
}

const NotificationsHeader = ({count}: Props) => (
  <div style={header}>
    Vous avez {count} notification(s) non lues
  </div>
)

const header = {
  backgroundColor: Colors.blue,
  color: '#fff',
  fontWeight: 'bold',
  padding: '11px 20px 15px',
  textAlign: 'center'
}

export default NotificationsHeader
