// @flow
import React from 'react'
import ChartFilters from './ChartsFilterComponent'
import ChartJS from './ChartjsComponent'
import HighchartsComponent from './HighchartsComponent'
import StatisticsSummerize from './StatisticsSummerize'
import StatisticsTops from './StatisticsTops'
import StatisticsAverages from './StatisticsAverages'
import Switch from '../SwitchButton'
import { Tab, Nav, NavItem, Row, Col } from 'react-bootstrap'

type Props = {
  container: HTMLDivElement
}

type State = {
  advanced: boolean,
  program: string,
  uuid: string,
  lotsStatusRatioUrl: Object,
  lotsStatusWorkflowUrl: Object,
  freqbyperiodUrl: Array<Object>,
  freqbyperiodLabels: Array<string>,
  freqbyperiodColors: Array<mixed>,
  freqbyperiodProgram: string,
  freqbyperiodOptions: Object,
  freqbyperiodadvancedUrl: Array<Object>,
  freqbyperiodadvancedLabels: Array<string>,
  freqbyperiodadvancedColors: Array<mixed>,
  freqbyperiodadvancedProgram: string,
  freqbyperiodadvancedOptions: Object,
  freqbylotsUrl: Array<Object>,
  freqbylotsLabels: Array<string>,
  freqbylotsColors: Array<mixed>,
  freqbylotsProgram: string,
  freqbylotsOptions: Object,
  freqbylotstimeUrl: Array<Object>,
  freqbylotstimeLabels: Array<string>,
  freqbylotstimeColors: Array<mixed>,
  freqbylotstimeProgram: string,
  freqbylotstimeOptions: Object
}

class Statistics extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      advanced: false,
      program: '',
      uuid: '',
      lotsStatusRatioUrl: {},
      lotsStatusWorkflowUrl: {},
      freqbyperiodUrl: [],
      freqbyperiodLabels: [],
      freqbyperiodColors: [],
      freqbyperiodProgram: '',
      freqbyperiodOptions: {},
      freqbyperiodadvancedUrl: [],
      freqbyperiodadvancedLabels: [],
      freqbyperiodadvancedColors: [],
      freqbyperiodadvancedProgram: '',
      freqbyperiodadvancedOptions: {},
      freqbylotsUrl: [],
      freqbylotsLabels: [],
      freqbylotsColors: [],
      freqbylotsProgram: '',
      freqbylotsOptions: {},
      freqbylotstimeUrl: [],
      freqbylotstimeLabels: [],
      freqbylotstimeColors: [],
      freqbylotstimeProgram: '',
      freqbylotstimeOptions: {}
    }
  }

  setData = () => {
    this.setState({
      advanced: false,
      program: this.props.container.dataset.program,
      uuid: this.props.container.dataset.uuid,
      lotsStatusRatioUrl: {type: 'ratio', 'filters': {}},
      lotsStatusWorkflowUrl: {type: 'workflowStats', 'filters': {}},
      freqbyperiodUrl: JSON.parse(this.props.container.dataset.charts).freqbyperiod['urls'],
      freqbyperiodLabels: JSON.parse(this.props.container.dataset.charts).freqbyperiod['labels'],
      freqbyperiodColors: JSON.parse(this.props.container.dataset.charts).freqbyperiod['colors'],
      freqbyperiodProgram: JSON.parse(this.props.container.dataset.charts).freqbyperiod['program'],
      freqbyperiodOptions: JSON.parse(this.props.container.dataset.charts).freqbyperiod['options'],
      freqbyperiodadvancedUrl: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['urls'],
      freqbyperiodadvancedLabels: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['labels'],
      freqbyperiodadvancedColors: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['colors'],
      freqbyperiodadvancedProgram: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['program'],
      freqbyperiodadvancedOptions: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['options'],
      freqbylotsUrl: JSON.parse(this.props.container.dataset.charts).freqbylots['urls'],
      freqbylotsLabels: JSON.parse(this.props.container.dataset.charts).freqbylots['labels'],
      freqbylotsColors: JSON.parse(this.props.container.dataset.charts).freqbylots['colors'],
      freqbylotsProgram: JSON.parse(this.props.container.dataset.charts).freqbylots['program'],
      freqbylotsOptions: JSON.parse(this.props.container.dataset.charts).freqbylots['options'],
      freqbylotstimeUrl: JSON.parse(this.props.container.dataset.charts).freqbylotstime['urls'],
      freqbylotstimeLabels: JSON.parse(this.props.container.dataset.charts).freqbylotstime['labels'],
      freqbylotstimeColors: JSON.parse(this.props.container.dataset.charts).freqbylotstime['colors'],
      freqbylotstimeProgram: JSON.parse(this.props.container.dataset.charts).freqbylotstime['program'],
      freqbylotstimeOptions: JSON.parse(this.props.container.dataset.charts).freqbylotstime['options']
    })
  }

  componentWillMount () {
    this.setData()
  }

  setAdvancedMode = () => {
    this.setState({
      advanced: !this.state.advanced
    })
  }

  getQuery = (queries: Array<Object>, filters: Object) => {
    let newQuery = []
    if (filters) {
      queries.forEach((query, i) => {
        newQuery.push(query)
        newQuery[i].filters = {...filters, ...query.filters}
        newQuery[i].filters = {...newQuery[i].filters}
      })
      return newQuery
    } else {
      queries.forEach((query, i) => {
        newQuery.push(query)
        newQuery[i].filters = {...query.filters}
      })
    }
    return queries
  }

  getServiceQuery = (queries: Object, filters: Object) => {
    return {...queries, ...filters, ...{uuid: this.state.uuid}}
  }

  updateQueries = (filters: Object) => {
    let charts = {
      lotsStatusRatio: {type: 'ratio', filters: {}},
      lotsStatusWorkflow: {type: 'workflowStats', filters: {}},
      freqbyperiod: JSON.parse(this.props.container.dataset.charts).freqbyperiod['urls'],
      freqbyperiodadvanced: JSON.parse(this.props.container.dataset.charts).freqbyperiodadvanced['urls'],
      freqbylots: JSON.parse(this.props.container.dataset.charts).freqbylots['urls'],
      freqbylotstime: JSON.parse(this.props.container.dataset.charts).freqbylotstime['urls']
    }
    Object.keys(charts).forEach(key => {
      switch (key) {
        case 'lotsStatusRatio':
          this.setState({ lotsStatusRatioUrl: this.getServiceQuery(charts[key], filters) })
          break
        case 'lotsStatusWorkflow':
          this.setState({ lotsStatusWorkflowUrl: this.getServiceQuery(charts[key], filters) })
          break
        case 'freqbyperiod':
          this.setState({ freqbyperiodUrl: this.getQuery(charts[key], filters) })
          break
        case 'freqbyperiodadvanced':
          this.setState({ freqbyperiodadvancedUrl: this.getQuery(charts[key], filters) })
          break
        case 'freqbylots':
          this.setState({ freqbylotsUrl: this.getQuery(charts[key], filters) })
          break
        case 'freqbylotstime':
          this.setState({ freqbylotstimeUrl: this.getQuery(charts[key], filters) })
          break
        default:
          break
      }
    })
  }

  render () {
    return (
      <div>
        <Row>
          <Col xs={12}>
            <div className='panel panel-mini' id='sticky-filters'>
              <div className='panel-title'>
                <h4>Sélection des filtres</h4>
              </div>
              <div className='panel-body'>
                <ChartFilters onFilter={this.updateQueries} program={this.state.program} />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2}>
            <StatisticsSummerize ratioUrls={this.state.lotsStatusRatioUrl} program={this.state.program} />
          </Col>
          <Col xs={12} md={this.state.uuid ? 10 : 6} lg={this.state.uuid ? 10 : 7}>
            <div className='panel' style={{marginBottom: '10px'}}>
              <div className='panel-title'>
                <h4><i className='fa'>&nbsp;</i>Statut des lots</h4>
              </div>
              <div className='panel-body' style={{padding: '8.4rem 0'}}>
                <HighchartsComponent workflowUrls={this.state.lotsStatusWorkflowUrl}
                  ratioUrls={this.state.lotsStatusRatioUrl} program={this.state.program}
                  style={{margin: 'auto', width: '100%'}} />
              </div>
            </div>
          </Col>
          {!this.state.uuid && (
            <Col md={3}>
              <div className='panel panel-mini'>
                <div className='panel-title'>
                  <h4>Les 5 + ou - visités</h4>
                </div>
                <div className='panel-body'>
                  <StatisticsTops program={this.state.program} />
                </div>
              </div>
              <div className='panel panel-mini' style={{}}>
                <div className='panel-title'>
                  <h4>Moyennes</h4>
                </div>
                <div className='panel-body' style={{paddingBottom: 0}}>
                  <StatisticsAverages program={this.state.program} />
                </div>
              </div>
            </Col>
          )}
        </Row>
        <Row>
          <Col xs={12} style={{marginBottom: '20px'}}>
            {this.state.advanced === false && (
              <div className='panel'>
                <div className='panel-title' style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h4>Fréquentation par période</h4>
                  <Switch value={this.state.advanced} onChange={() => this.setAdvancedMode()} />
                </div>
                <div className='panel-body'>
                  <ChartJS program={this.state.program} urls={this.state.freqbyperiodUrl}
                    labels={this.state.freqbyperiodLabels} options={this.state.freqbyperiodOptions}
                    colors={this.state.freqbyperiodColors} />
                </div>
              </div>
            )}
            {this.state.advanced === true && (
              <div className='panel'>
                <div className='panel-title' style={{display: 'flex', justifyContent: 'space-between'}}>
                  <h4>Fréquentation par période (avancé)</h4>
                  <Switch value={this.state.advanced} onChange={() => this.setAdvancedMode()} />
                </div>
                <div className='panel-body'>
                  <ChartJS program={this.state.program} urls={this.state.freqbyperiodadvancedUrl}
                    labels={this.state.freqbyperiodadvancedLabels} options={this.state.freqbyperiodadvancedOptions}
                    colors={this.state.freqbyperiodadvancedColors} />
                </div>
              </div>
            )}
            {this.state.advanced === true && (
              <Tab.Container id='tab-pan' defaultActiveKey='first'>
                <Row className='clearfix'>
                  <Col sm={12}>
                    <Nav bsStyle='tabs'>
                      <NavItem eventKey='first' style={{color: '#555 !important'}}>
                        Fréquentation par lot
                      </NavItem>
                      <NavItem eventKey='second' style={{color: '#555 !important'}}>
                        Durée des visites
                      </NavItem>
                    </Nav>
                  </Col>
                  <Col sm={12}>
                    <Tab.Content animation style={tabContent}>
                      <Tab.Pane eventKey='first'>
                        <div className='panel' style={{boxShadow: 'none'}}>
                          <div className='panel-title' style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Fréquentation par lot</h4>
                          </div>
                          <div className='panel-body'>
                            <ChartJS program={this.state.program} urls={this.state.freqbylotsUrl}
                              labels={this.state.freqbylotsLabels} options={this.state.freqbylotsOptions}
                              colors={this.state.freqbylotsColors} />
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey='second'>
                        <div className='panel' style={{boxShadow: 'none'}}>
                          <div className='panel-title' style={{display: 'flex', justifyContent: 'space-between'}}>
                            <h4>Durée des visites</h4>
                          </div>
                          <div className='panel-body'>
                            <ChartJS program={this.state.program} urls={this.state.freqbylotstimeUrl}
                              labels={this.state.freqbylotstimeLabels} options={this.state.freqbylotstimeOptions}
                              colors={this.state.freqbylotstimeColors} />
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            )}
          </Col>
        </Row>
      </div>
    )
  }
}

const tabContent = {
  borderLeft: '1px solid #ddd',
  borderRight: '1px solid #ddd',
  borderBottom: '1px solid #ddd'
}

export default Statistics
