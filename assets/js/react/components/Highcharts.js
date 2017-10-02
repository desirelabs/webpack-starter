import React from 'react'
import ReactDOM from 'react-dom'
import ReactHighcharts from 'react-highcharts'
import { NoDataToDisplay } from 'react-highcharts-no-data-to-display'
let chartReflow

require('highcharts-drilldown')(ReactHighcharts.Highcharts)
NoDataToDisplay(ReactHighcharts.Highcharts)

class Chart extends React.Component {
  constructor () {
    super()
    this.state = {
      config: {
        colors: ['#e53935', '#FFCC00', '#00acc1', '#9F70E1', '#9F70E1', '#43a047'],
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
    this.chartjsWorkflowPieCtx = null
    this.ratio = null
    this.workflow = null
    this.data = []
    this.series = []
    this.configs = []
  }

  componentDidMount () {
    this.chartjsWorkflowPieCtx = document.querySelector('#statistics-pie-chart-item')
    this.ratio = JSON.parse(this.chartjsWorkflowPieCtx.dataset.ratio)
    this.workflow = JSON.parse(this.chartjsWorkflowPieCtx.dataset.workflow)
    this.configs = this.workflow.map(entries => entries.filter((entry, key) => key > 1 ? key : null))
    this.setDatas()
  }

  setDatas () {
    Object.keys(this.ratio.All).forEach((value, key) => {
      if (value !== 'register' && this.hasValue(this.configs[key])) {
        let status = this.workflow[key][3][2]
        let statusValue = this.workflow[key][0][1]
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

  componentDidUpdate () {
    const chart = this.refs.chart ? this.refs.chart.getChart() : {}
    chartReflow = chartReflow || chart.reflow
    chart.reflow = () => {}
    setTimeout(() => (chart.reflow = chartReflow))
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

let container = document.querySelector('#statistics-pie-chart-item')

if (container) {
  ReactDOM.render(
    <Chart />,
    container
  )
}
