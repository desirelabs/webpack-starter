import React from 'react'
import axios from 'axios'
import { Dropdown, ButtonToolbar } from 'react-bootstrap'
import Modal from '../components/ModalComponent'

import NotificationsList from './NotificationsList'
import NotificationsHeader from './NotificationsHeader'
import NotificationsFooter from './NotificationsFooter'

import Colors from '../../styles/colorScheme'
import notifIcon from './assets/notifications-icon.svg'

class NotificationsComponent extends React.Component {
  constructor () {
    super()
    this.state = {
      showModal: false,
      modalAction: null,
      headerMessage: '',
      bodyMessage: '',
      notifications: [],
      url: 'https://www.mageland.fr.flebas.local/app_dev.php/api/notifications'
    }

    this.dismissNotification = this.dismissNotification.bind(this)
    this.deleteNotification = this.deleteNotification.bind(this)
    this.dismissAll = this.dismissAll.bind(this)
    this.deleteAll = this.deleteAll.bind(this)
    this.configModal = this.configModal.bind(this)
    this.resetModal = this.resetModal.bind(this)
  }

  dismissAll () {
    axios.post(window.Routing.generate(
      'notifications_dismiss'
    )).then(() => {
      this.setState({
        notifications: this.state.notifications.filter(notif => {
          notif.dismissed = true
          return notif
        })
      })
    }).catch(error => {
      console.log('Error', error)
    })
  }

  deleteAll () {
    axios.post(window.Routing.generate(
      'notifications_delete'
    )).then(response => {
      this.setState({
        notifications: []
      }, this.resetModal())
    }).catch(error => {
      console.log('Error', error)
      this.resetModal()
    })
  }

  dismissNotification (id) {
    this.state.notifications.filter(notif => {
      if (notif.id === id) {
        axios.put(window.Routing.generate(
          'api_notifications_put_item',
          { id: id }
        ),
        {
          headers: {'Accept': 'application/json'},
          dismissed: !notif.dismissed
        }).then(() => {
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
    axios.get(window.Routing.generate(
      'api_notifications_get_collection'
    ), {
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => {
      this.setState({
        notifications: response.data
      })
    }).catch(error => {
      console.log('Error : ', error)
    })
  }

  deleteNotification (id) {
    axios.delete(window.Routing.generate(
      'api_notifications_delete_item',
      {id: id}
    )).then(response => {
      this.setState({
        notifications: this.state.notifications.filter(notif => notif.id !== id)
      }, this.resetModal())
    }).catch(error => {
      console.log('Error', error)
      this.resetModal()
    })
  }

  resetModal () {
    this.setState({
      showModal: false,
      modalAction: null,
      headerMessage: '',
      bodyMessage: ''
    })
  }

  configModal (headerMessage, bodyMessage, action) {
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
              <span style={notifCount}>
                {this.state.notifications.filter(notif => !notif.dismissed).length}
              </span>
            }
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu animated bounceInDown' style={{borderRadius: '5px', overflow: 'hidden'}}>
            <div>
              <NotificationsHeader count={this.state.notifications.filter(notif => !notif.dismissed).length} />
              <NotificationsList notifications={this.state.notifications} onDismiss={this.dismissNotification} onDelete={(id) => this.configModal('Suppression', 'Confirmer ?', () => this.deleteNotification(id))} />
              <NotificationsFooter onDismissAll={this.dismissAll} onDeleteAll={() => this.configModal('Suppression de toutes les notifications', 'Confirmer ?', () => this.deleteAll())} />
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
  boxShadow: 'none'
}

const notifCount = {
  position: 'absolute',
  fontFamily: 'Avenir-Heavy, AvenirNext-Regular, Helvetica',
  top: '8px',
  right: 0,
  margin: 0,
  borderRadius: '15px',
  color: '#fff',
  backgroundColor: Colors.red,
  padding: '3px 6px',
  display: 'inline-block',
  minWidth: '10px',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: 1,
  textAlign: 'center',
  whiteSpace: 'nowrap',
  verticalAlign: 'middle'
}

export default NotificationsComponent
