// @flow
import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { Row, Col } from 'react-bootstrap'
import AverageItem from './StatisticsAverageItem'

type Props = {
  program: string
}
type State = {
  averageConfig: Object,
  averageVisits: Object,
  avgConfigBeforContact: Object
}

class StatisticsAverages extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      averageConfig: {},
      averageVisits: {},
      avgConfigBeforContact: {}
    }
  }

  queryData (type: string, title: string) {
    axios.get(window.Routing.generate(
      'program_stats_type', {
        id: this.props.program,
        type: type
      }
    )).then(response => {
      this.setState({[type]: {
        title: title,
        value: !isNaN(response.data) ? _.round(response.data, 2) : 'N/A'
      }})
    })
  }

  getData () {
    this.queryData('averageConfig', 'Moyenne configurations / clients')
    this.queryData('averageVisits', 'Nombre moyen de visites entre chaque nouveau client')
    this.queryData('avgConfigBeforContact', 'Nombre moyen de configurations avant contact')
  }

  componentWillMount () {
    this.getData()
  }

  render () {
    return (
      <Row>
        {Object.keys(this.state).map((average, key) =>
          <Col xs={12} key={key}>
            <AverageItem average={this.state[average]} />
          </Col>
        )}
      </Row>
    )
  }
}

export default StatisticsAverages
