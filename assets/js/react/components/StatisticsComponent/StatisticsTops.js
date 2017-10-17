// @flow
import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
import Colors from '../../styles/colorScheme'

type Props = {
  program: string
}

type State = {
  today: Object,
  yesterday: Object
}

class StatisticsTops extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      today: {},
      yesterday: {}
    }
  }

  getData () {
    axios.get(window.Routing.generate(
      'program_stats_type',
      {
        type: 'visits',
        id: this.props.program
      }
    )).then(response => {
      this.setState({
        today: _.mapValues(_.invert(response.data.today)),
        yesterday: _.mapValues(_.invert(response.data.yesterday))
      })
    })
  }

  componentWillMount () {
    this.getData()
  }

  render () {
    return (
      <Row>
        <Col xs={12} md={6}>
          <h5 style={title}>Les plus visités</h5>
          <ul style={list}>
            {Object.values(this.state.today).map((label: any, index: any) => (
              index < 5 &&
                <li key={index}>
                  {(Object.values(this.state.today).indexOf(label) > Object.values(this.state.yesterday).indexOf(label)) && (
                    <i className='fa fa-arrow-right long-up' style={longUp} aria-hidden='true'>&nbsp;</i>
                  )}
                  {(Object.values(this.state.today).indexOf(label) < Object.values(this.state.yesterday).indexOf(label)) && (
                    <i className='fa fa-arrow-right long-down' style={longDown} aria-hidden='true'>&nbsp;</i>
                  )}
                  {(Object.values(this.state.today).indexOf(label) === Object.values(this.state.yesterday).indexOf(label)) && (
                    <i className='fa fa-arrow-right long-straight' style={longStraight} aria-hidden='true'>&nbsp;</i>
                  )}
                  {label}
                </li>
            ))}
          </ul>
        </Col>
        <Col xs={12} md={6}>
          <h5 style={title}>Les moins visités</h5>
          <ul style={list}>
            {Object.values(this.state.today).slice(Math.max(Object.values(this.state.today).length - 5, 1)).map((label: any, index: any) =>
              <li key={index}>
                {(Object.values(this.state.today).indexOf(label) > Object.values(this.state.yesterday).indexOf(label)) && (
                  <i className='fa fa-arrow-right long-up' style={longUp} aria-hidden='true'>&nbsp;</i>
                )}
                {(Object.values(this.state.today).indexOf(label) < Object.values(this.state.yesterday).indexOf(label)) && (
                  <i className='fa fa-arrow-right long-down' style={longDown} aria-hidden='true'>&nbsp;</i>
                )}
                {(Object.values(this.state.today).indexOf(label) === Object.values(this.state.yesterday).indexOf(label)) && (
                  <i className='fa fa-arrow-right long-straight' style={longStraight} aria-hidden='true'>&nbsp;</i>
                )}
                {label}
              </li>
            )}
          </ul>
        </Col>
      </Row>
    )
  }
}

const list = {
  paddingLeft: '5px',
  listStyleType: 'none'
}

const longUp = {
  transform: 'rotate(-45deg)',
  color: Colors.green
}

const longDown = {
  transform: 'rotate(45deg)',
  color: Colors.red
}

const longStraight = {
  color: Colors.orange
}

const title = {
  fontSize: '1.75rem',
  marginBottom: '1rem',
  paddingBottom: '1rem',
  borderBottom: '1px solid #d0d0d0'
}

export default StatisticsTops
