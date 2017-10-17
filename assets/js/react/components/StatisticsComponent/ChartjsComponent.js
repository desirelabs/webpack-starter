// @flow
import React from 'react'
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
import { Bar } from 'react-chartjs-2'

type query = {
  type: string,
  filters: Object
}

type Props = {
  colors: Array<mixed>,
  labels: Array<string>,
  options: Object,
  program: string,
  urls: Array<query>
}

type State = {
  colors: Array<mixed>,
  datasets: Array<Object>,
  labels: Array<string>
}

/**
 * A chartJS Component abstraction
 */
class ChartJS extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      colors: [],
      datasets: [],
      labels: []
    }
  }

  componentDidMount () {
    this.getData()
  }

  /**
   * Call the datasets builder
   * when data are set
   * @param prevProps
   * @param prevState
   */
  componentDidUpdate (prevProps: Object, prevState: Object) {
    if (_.isEqual(prevProps.urls, this.props.urls) === false) {
      this.getData()
    }
  }

  /**
   * Set the data needed by the chart to build
   */
  getData = () => {
    let datasets = []
    let labels = []
    axios.get(window.Routing.generate('stats_stack', {
      ...{id: this.props.program},
      ...{'queries': this.props.urls}
    })).then(response => {
      response.data.forEach((dataset, key) => {
        if (Array.isArray(dataset)) {
          labels.push(dataset.map(el => moment(el.label).isValid() && isNaN(el.label) ? this.formatLabel(el.label) : el.label))
        }
        datasets.push({
          label: this.props.labels[key],
          backgroundColor: this.props.colors[key][0],
          borderColor: this.props.colors[key][1],
          borderWidth: 0,
          hoverBackgroundColor: this.props.colors[key][0],
          hoverBorderColor: this.props.colors[key][1],
          radius: 0,
          type: (!Array.isArray(dataset) || this.props.labels[key].indexOf('ouveau') !== -1) ? 'line' : false,
          data: Array.isArray(dataset) ? dataset.map(el => el.data) : response.data[0].map(el => Object.values(dataset)[0]),
          fill: Array.isArray(dataset)
        })
      })
      this.setState({
        colors: this.props.colors,
        datasets: datasets,
        labels: labels[0]
      })
    })
  }

  shallowCompare (nextProps: Object, nextState: Object) {
    return (
      !_.isEqual(this.props, nextProps) ||
      !_.isEqual(this.state, nextState)
    )
  }

  formatLabel (label: string) {
    moment.locale('fr')
    if (!this.props.urls[0].hasOwnProperty('filters') || !this.props.urls[0].filters.hasOwnProperty('date')) {
      return _.upperFirst(moment(label).format('YYYY'))
    } else {
      switch (this.props.urls[0].filters.date) {
        case '-1 week':
          return _.upperFirst(moment(label).format('DD MMMM YYYY'))
        case '-1 month':
          let date = moment(label).format()
          return moment(date).format('DD MMMM YYYY')
        case '-3 months':
          return _.upperFirst(moment(label).format('MMMM YYYY'))
        case '-6 months':
          return _.upperFirst(moment(label).format('MMMM YYYY'))
        case '-1 year':
          return _.upperFirst(moment(label).format('MMMM YYYY'))
        default:
          return _.upperFirst(moment(label).format('YYYY'))
      }
    }
  }

  shouldComponentUpdate (nextProps: Object, nextState: Object) {
    return this.shallowCompare(nextProps, nextState)
  }

  render () {
    const data = {
      labels: this.state.labels,
      datasets: this.state.datasets
    }
    const options = this.props.options
    return (
      <div>
        <Bar
          data={data}
          options={options}
        />
      </div>
    )
  }
}

export default ChartJS
