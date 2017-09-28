import React from 'react'
import PropTypes from 'prop-types'
import Colors from '../../styles/colorScheme'

const NotificationsHeader = ({count}) => (
  <div style={header}>
    Vous avez {count} notification(s) non lues
  </div>
)

NotificationsHeader.propTypes = {
  count: PropTypes.number
}

const header = {
  backgroundColor: Colors.blue,
  color: '#fff',
  fontWeight: 'bold',
  padding: '11px 20px 15px',
  textAlign: 'center'
}

export default NotificationsHeader
