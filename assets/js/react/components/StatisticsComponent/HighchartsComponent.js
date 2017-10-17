import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import _ from 'lodash'
import ReactHighcharts from 'react-highcharts'
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display'
let chartReflow

require('highcharts-drilldown')(ReactHighcharts.Highcharts)
NoDataToDisplay(ReactHighcharts.Highcharts)

class HighchartsComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      ratio: {},
      workflowStats: [],
      config: {
        colors: ['#e53935', '#FFCC00', '#00acc1', '#5ecc8d', '#7ed240', '#43a047'],
        animation: true,
        lang: {
          noData: 'Aucune donnée à afficher',
          drillUpText: '< Retour'
        },
        noData: {
          position: {
            'x': 0,
            'y': 0,
            'align': 'center',
            'verticalAlign': 'middle'
          }
        },
        responsive: {
          rules: [{
            condition: {
              maxWidth: 600
            },
            chartOptions: {
              series: [{
                id: 'versions',
                dataLabels: {
                  enabled: false
                }
              }]
            }
          }]
        },
        credits: {
          enabled: false
        },
        chart: {
          type: 'pie'
        },
        title: {
          text: 'Cliquez sur les portions pour afficher les détails',
          margin: 70,
          style: {'font-size': '16px'}
        },
        plotOptions: {
          pie: {
            size: '100%'
          },
          series: {
            dataLabels: {
              enabled: true,
              format: '{point.name}: {point.y}'
            }
          }
        },
        tooltip: {
          headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y}</b><br/>'
        }
      },
      neverReflow: true
    }
    this.data = []
    this.series = []
    this.configs = []
  }

  componentWillMount () {
    this.getData()
  }

  componentDidUpdate (prevProps, prevState) {
    if (!_.isEqual(prevProps.ratioUrls, this.props.ratioUrls)) {
      this.getData()
    }
    if (!_.isEqual(prevState.config, this.state.config)) {
      const chart = this.refs.chart ? this.refs.chart.getChart() : {}
      chartReflow = chartReflow || chart.reflow
      chart.reflow = () => {}
      setTimeout(() => (chart.reflow = chartReflow), 500)
    }
  }

  getData () {
    let ratio = {}
    let workflowStats = []
    axios.get(window.Routing.generate(
      'program_stats_type', Object.assign({}, {
        id: this.props.program,
        type: 'ratio'
      }, this.props.ratioUrls))).then(response => {
      ratio = response.data
      axios.get(window.Routing.generate(
        'program_stats_type', Object.assign({}, {
          id: this.props.program,
          type: 'workflowStats'
        }, this.props.workflowUrls)
      )).then(response => {
        workflowStats = response.data

        if (!_.isEqual({}, ratio) && !_.isEqual([], workflowStats)) {
          this.configs = workflowStats.map(entries => entries.filter((entry, key) => key > 1 ? key : null))
          this.setDatas(ratio, workflowStats)
        }
      }).catch(error => console.log('Error', error))
    }).catch(error => console.log('Error', error))
  }

  setDatas (ratio, workflowStats) {
    this.data = []
    this.series = []
    Object.keys(ratio.All).forEach((value, key) => {
      if (value !== 'register' && this.hasValue(this.configs[key])) {
        let status = workflowStats[key][3][2]
        let statusValue = workflowStats[key][0][1]
        this.data.push({
          name: status,
          y: statusValue,
          drilldown: status
        })
        this.series.push({
          name: status,
          id: status,
          data: this.configs[key],
          size: '100%'
        })
      }
    })
    this.setState({
      workflowStats: workflowStats,
      ratio: ratio,
      config: {
        ...this.state.config,
        series: [{
          name: 'Statuts',
          colorByPoint: true,
          data: this.data
        }],
        drilldown: {
          series: this.series
        }
      }
    })
  }

  hasValue (values) {
    let hasValues = false
    if (Array.isArray(values) && values.length > 0) {
      values.forEach(value => {
        if (value[1] > 0) {
          hasValues = true
        }
      })
    }
    return hasValues
  }

  render () {
    return (
      <ReactHighcharts config={this.state.config} ref='chart' />
    )
  }
}

HighchartsComponent.propTypes = {
  program: PropTypes.string
}

export default HighchartsComponent
