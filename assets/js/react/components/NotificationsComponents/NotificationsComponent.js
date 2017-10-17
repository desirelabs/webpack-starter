// @flow
import React from 'react'
import axios from 'axios'
import { Dropdown, ButtonToolbar } from 'react-bootstrap'
import Modal from '../components/ModalComponent'

import NotificationsList from './NotificationsList'
import NotificationsHeader from './NotificationsHeader'
import NotificationsFooter from './NotificationsFooter'
import Badge from '../components/BadgeComponent'

import notifIcon from './assets/notifications-icon.svg'

type Props = {}

type notification = {
  createdAt: string,
  dismissed: boolean,
  id: number,
  routeName: string,
  routeVars: Object,
  title: string
}

type State = {
  showModal: boolean,
  modalAction: Function,
  headerMessage: string,
  bodyMessage: string,
  notifications: Array<notification>
}

class NotificationsComponent extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      showModal: false,
      modalAction: () => {},
      headerMessage: '',
      bodyMessage: '',
      notifications: []
    }
  }

  dismissAll = () => {
    axios.post(`http://localhost:3000/notifications/`, { dismiss: true }).then(() => {
      this.setState({
        notifications: this.state.notifications.filter(notif => {
          notif.dismissed = true
          return notif
        })
      })
    }).catch(error => {
      console.log('Error', error.message)
    })
  }

  deleteAll = () => {
    axios.post(`http://localhost:3000/notifications/`).then(response => {
      this.setState({
        notifications: []
      }, this.resetModal())
    }).catch(error => {
      console.log('Error', error.message)
      this.resetModal()
    })
  }

  dismissNotification = (id: number) => {
    this.state.notifications.filter(notif => {
      if (notif.id === id) {
        axios.put(`http://localhost:3000/notifications/${id}`,
          {
            ...notif,
            dismissed: !notif.dismissed
          }
        ).then(() => {
          this.setState({
            notifications: this.state.notifications.filter(notif => {
              if (notif.id === id) {
                notif.dismissed = !notif.dismissed
              }
              return notif
            })
          })
        })
      }
    })
  }

  getNotifications () {
    axios.get('http://localhost:3000/notifications', {
      headers: {'Accept': 'application/json'}
    }).then(response => {
      this.setState({
        notifications: response.data
      })
    }).catch(error => {
      console.log('Error : ', error.message)
    })
  }

  deleteNotification = (id: number) => {
    axios.delete(`http://localhost:3000/notifications/${id}`).then(response => {
      this.setState({
        notifications: this.state.notifications.filter(notif => notif.id !== id)
      }, this.resetModal())
    }).catch(error => {
      console.log('Error', error.message)
      this.resetModal()
    })
  }

  onNotifClick = (id: number) => {
    window.location = `http://localhost:3000/notifications/${id}`
  }

  resetModal = () => {
    this.setState({
      showModal: false,
      modalAction: () => {},
      headerMessage: '',
      bodyMessage: ''
    })
  }

  configModal = (headerMessage: string, bodyMessage: string, action: Function) => {
    this.setState({
      showModal: true,
      headerMessage: headerMessage,
      bodyMessage: bodyMessage,
      modalAction: action
    })
  }

  componentWillMount () {
    this.getNotifications()
  }

  render () {
    return (
      <ButtonToolbar style={notificationsWrapper}>
        <Dropdown id='dropdown-custom-1'>
          <Dropdown.Toggle noCaret style={dropdownButton}>
            <img src={notifIcon} alt='Notifications' width='40' height='40' />
            {this.state.notifications.filter(notif => !notif.dismissed).length > 0 &&
            <Badge count={this.state.notifications.filter(notif => !notif.dismissed).length} style={{}} />
            }
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu animated bounceInDown' style={{borderRadius: '5px', overflow: 'hidden'}}>
            <div>
              <NotificationsHeader count={this.state.notifications.filter(notif => !notif.dismissed).length} />
              <NotificationsList notifications={this.state.notifications} onNotifClick={this.onNotifClick} onDismiss={this.dismissNotification} onDelete={(id) => this.configModal('Suppression', 'Suppprimer ce message ?', () => this.deleteNotification(id))} />
              <NotificationsFooter onDismissAll={this.dismissAll} onDeleteAll={() => this.configModal('Suppression de toutes les notifications', 'Supprimer tous les messages ?', () => this.deleteAll())} />
            </div>
          </Dropdown.Menu>
        </Dropdown>
        <Modal showModal={this.state.showModal} headerMessage={this.state.headerMessage} bodyMessage={this.state.bodyMessage} onCancel={this.resetModal} onConfirm={this.state.modalAction} />
      </ButtonToolbar>
    )
  }
}

const notificationsWrapper = {
  minHeight: '90px',
  display: 'flex',
  alignItems: 'center'
}

const dropdownButton = {
  border: 'none',
  backgroundColor: 'transparent',
  boxShadow: 'none',
  marginRight: '-15px'
}

export default NotificationsComponent
