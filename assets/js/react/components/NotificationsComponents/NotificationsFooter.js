// @flow
import React from 'react'
import Colors from '../../styles/colorScheme'

type Props = {
  onDismissAll: Function,
  onDeleteAll: Function
}

const NotificationsFooter = ({onDismissAll, onDeleteAll}: Props) => (
  <div style={{backgroundColor: '#fff', padding: '1px'}}>
    <button onClick={onDismissAll} style={{...button, color: Colors.green}}>Tout marquer comme lu</button>
    <button onClick={onDeleteAll} style={{...button, color: Colors.orange}}>Tout supprimer</button>
  </div>
)

const button = {
  width: '100%',
  height: '34px',
  backgroundColor: Colors.blue,
  border: 'none',
  marginBottom: '1px',
  color: '#fff',
  textAlign: 'center',
  borderRadius: '2px'
}

export default NotificationsFooter
