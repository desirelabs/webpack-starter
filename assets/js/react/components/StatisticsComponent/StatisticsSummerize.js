// @flow
import React from 'react'
import axios from 'axios'
import _ from 'lodash'

type Props = {
  program: string,
  ratioUrls: Object
}
type State = {
  ratio: Object
}

class StatisticsSummerize extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      ratio: {}
    }
  }

  getData () {
    axios.get(window.Routing.generate(
      'program_stats_type', Object.assign({}, {
        id: this.props.program,
        type: 'ratio'
      }, this.props.ratioUrls))).then(response => {
      this.setState({
        ratio: response.data
      })
    })
  }

  componentWillMount () {
    this.getData()
  }

  componentDidUpdate (prevProps: Object) {
    if (_.isEqual(prevProps.ratioUrls, this.props.ratioUrls) === false) {
      this.getData()
    }
  }

  render () {
    return (
      <div>
        {this.state.ratio.All && (
          <div className='panel panel-mini module-overview-item danger'>
            <div className='panel-title'>
              <h4><i className='fa'>&nbsp;</i>Configurations</h4>
            </div>
            <div className='panel-body'>
              <div className='row-flex' style={{alignItems: 'center'}}>
                <div className='col-12'>
                  <span className='module-overview-item-value' style={value}>{this.state.ratio.All.configure}</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={separatorArrow}>
          <i className='fa fa-caret-down' style={{textAlign: 'center'}}>&nbsp;</i>
        </div>
        {this.state.ratio.All && (
          <div className='panel panel-mini module-overview-item primary'>
            <div className='panel-title'>
              <h4><i className='fa'>&nbsp;</i>Brouillons</h4>
            </div>
            <div className='panel-body'>
              <div className='row-flex' style={{alignItems: 'center'}}>
                <div className='col-6'>
                  <small>
                    {this.state.ratio.All.configure > 0
                      ? Math.round(this.state.ratio.All.lot_draft / this.state.ratio.All.configure * 100)
                      : 0 }% des configurations
                  </small>
                </div>
                <div className='col-6'>
                  <span className='module-overview-item-value' style={value}>{ this.state.ratio.All.lot_draft }</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={separatorArrow}>
          <i className='fa fa-caret-down' style={{textAlign: 'center'}}>&nbsp;</i>
        </div>
        {this.state.ratio.All && (
          <div className='panel panel-mini module-overview-item yellow'>
            <div className='panel-title'>
              <h4><i className='fa'>&nbsp;</i>Contacts</h4>
            </div>
            <div className='panel-body'>
              <div className='row-flex' style={{alignItems: 'center'}}>
                <div className='col-6'>
                  <small>
                    {this.state.ratio.All.lot_draft > 0
                      ? Math.round(this.state.ratio.All.lot_contact / this.state.ratio.All.lot_draft * 100)
                      : 0 }% des brouillons
                  </small>
                </div>
                <div className='col-6'>
                  <span className='module-overview-item-value' style={value}>{ this.state.ratio.All.lot_contact }</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={separatorArrow}>
          <i className='fa fa-caret-down' style={{textAlign: 'center'}}>&nbsp;</i>
        </div>
        {this.state.ratio.All && (
          <div className='panel panel-mini module-overview-item green'>
            <div className='panel-title'>
              <h4><i className='fa'>&nbsp;</i>Réservations</h4>
            </div>
            <div className='panel-body'>
              <div className='row-flex' style={{alignItems: 'center'}}>
                <div className='col-6'>
                  <small>
                    {this.state.ratio.All.lot_contact > 0
                      ? Math.round(this.state.ratio.All.lot_booked / this.state.ratio.All.lot_contact * 100)
                      : 0}% des contact
                  </small>
                </div>
                <div className='col-6'>
                  <span className='module-overview-item-value' style={value}>{ this.state.ratio.All.lot_booked }</span>
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={separatorArrow}>
          <i className='fa fa-caret-down' style={{textAlign: 'center'}}>&nbsp;</i>
        </div>
        {this.state.ratio.All && (
          <div className='panel panel-mini module-overview-item success'>
            <div className='panel-title'>
              <h4><i className='fa'>&nbsp;</i>Ventes</h4>
            </div>
            <div className='panel-body'>
              <div className='row-flex' style={{alignItems: 'center'}}>
                <div className='col-6'>
                  <small>
                    {this.state.ratio.All.lot_booked > 0
                      ? Math.round(this.state.ratio.All.lot_sold / this.state.ratio.All.lot_booked * 100)
                      : 0}% des réservations
                  </small>
                </div>
                <div className='col-6'>
                  <span className='module-overview-item-value' style={value}>{ this.state.ratio.All.lot_sold }</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const value = {
  fontSize: '3rem',
  display: 'block',
  textAlign: 'right'
}

const separatorArrow = {
  marginTop: '-25px',
  textAlign: 'center'
}

export default StatisticsSummerize
