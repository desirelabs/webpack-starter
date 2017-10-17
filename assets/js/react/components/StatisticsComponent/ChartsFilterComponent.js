// @flow
import React from 'react'
import axios from 'axios'
import _ from 'lodash'
import { MenuItem, Dropdown, FormControl, ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { CustomMenu, CustomToggle } from '../components/DropdownComponent'

type Props = {
  onFilter: Function,
  program: string
}

type State = {
  floorFilters: Array<Object>,
  typeFilters: Array<Object>,
  lotsFilters: Array<Object>,
  periodeFilters: Array<Object>,
  currentFilters: Array<Object>,
  availableLots: Array<Object>,
  currentLots: Array<Object>,
  filteredBy: Array<string>,
  floors: Array<string>,
  type: Array<string>,
  lots: Array<string>,
  date: string,
  availableDates: Object,
  dropdowns: Object
}

class ChartsFilter extends React.Component<Props, State> {
  constructor () {
    super()
    this.state = {
      floorFilters: [],
      typeFilters: [],
      lotsFilters: [],
      periodeFilters: [],
      currentFilters: [],
      availableLots: [],
      currentLots: [],
      filteredBy: [],
      floors: [],
      type: [],
      lots: [],
      date: '',
      availableDates: {},
      dropdowns: {}
    }
    this.onChange = this.onChange.bind(this)
  }

  componentDidMount () {
    this.getData()
  }

  getData () {
    axios.get(window.Routing.generate(
      'program_stats_type', {
        id: this.props.program,
        type: 'filters'
      }
    )).then(response => {
      this.setData(response.data)
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Update the state with the default values
   * @param filters
   */
  setData = (filters: Array<Object>) => {
    filters.forEach((filter, i) => {
      filters[i] = Object.assign({}, filter, {open: false})
    })

    this.setState({
      floorFilters: filters.filter(filter => filter.name === 'floors'),
      typeFilters: filters.filter(filter => filter.name === 'type'),
      lotsFilters: filters.filter(filter => filter.name === 'lots'),
      periodeFilters: filters.filter(filter => filter.name === 'date'),
      currentFilters: filters,
      availableLots: filters.filter(filter => filter.name === 'lots').map(filter => filter.values)[0].sort((a, b) => {
        let aval = parseInt(a.value)
        let bval = parseInt(b.value)
        if (isNaN(aval)) {
          return 1
        }
        if (isNaN(bval)) {
          return -1
        }
        return aval - bval
      }),
      currentLots: filters.filter(filter => filter.name === 'lots').map(filter => filter.values)[0],
      filteredBy: this.state.filteredBy,
      floors: [],
      type: [],
      lots: [],
      date: '',
      availableDates: {},
      dropdowns: {}
    })
    filters.map((filter, key) => {
      this.setState({
        dropdowns: {...this.state.dropdowns, ...{[key + 1]: false}}
      })
    })
    filters.filter(filter => {
      if (filter.name === 'date') {
        let dates = filter.values.reduce((date, iter, i) => {
          let value = {[iter.value]: iter.label}
          return {...date, ...value}
        }, {})
        this.setState({
          availableDates: dates
        })
      }
    })
  }

  componentDidUpdate (prevProps: Object, prevState: Object) {
    if (this.state.floors !== prevState.floors || this.state.type !== prevState.type || this.state.lots !== prevState.lots || this.state.date !== prevState.date) {
      this.onChange()
    }
  }

  onChange = () => {
    let initial = {
      floors: [],
      types: [],
      lots: [],
      date: ''
    }
    let latest = {
      floors: this.state.floors,
      types: this.state.type,
      lots: this.state.lots,
      date: this.state.date
    }
    let isEqual = _.isEqual(initial, latest)
    isEqual ? this.props.onFilter(false) : this.props.onFilter(latest)
  }

  /**
   * Updates the state values for floor and type filtering
   * @param val
   * @param type
   * @returns {Promise.<void>}
   */
  async filterItems (val: string, type: string) {
    switch (type) {
      case 'floors':
        this.setState({floors: this.state.floors.indexOf(val) === -1 ? [...this.state.floors, val] : this.state.floors.filter(el => el !== val)})
        break
      case 'type':
        this.setState({type: this.state.type.indexOf(val) === -1 ? [...this.state.type, val] : this.state.type.filter(el => el !== val)})
        break
      case 'lots':
        this.setState({lots: this.state.lots.indexOf(val) === -1 ? [...this.state.lots, val] : this.state.lots.filter(el => el !== val)})
        break
      case 'date':
        this.setState({date: val})
        break
      default:
        break
    }
  }

  /**
   * Set current filtered lots
   */
  filterLots = () => {
    let filters = [this.state.floors, this.state.type]
    let currentLots = this.state.availableLots
      .filter(lot => filters[0].indexOf(lot.attr[0]['data-floor']) !== -1 || filters[0].length === 0)
      .filter(lot => filters[1].indexOf(lot.attr[0]['data-type']) !== -1 || filters[1].length === 0)
    this.setState({
      currentLots: currentLots
    })
  }

  /**
   * Call both
   * @param name
   * @param value
   */
  updateFiltered = (name: string, value: string) => {
    this.filterItems(value, name).then(_ => this.filterLots())
  }

  processMessage (message: mixed) {
    return Array.isArray(message) ? message.join(', ') : message
  }

  /**
   * Returns the title to display in dropdown select menu
   * @param prop
   * @param title
   * @returns {*}
   */
  getTitle (prop: string, title: string) {
    switch (prop) {
      case 'type':
        if (this.state.type.length === 0) {
          return title
        } else {
          return this.processMessage(this.state.type)
        }
      case 'floors':
        if (this.state.floors.length === 0) {
          return title
        } else {
          return this.state.floors.map((el, index) => {
            if (index === 0) {
              return el === 0 ? 'RDC' : (el === 1 ? `${el}er` : `${el}ème`)
            } else {
              return el === 0 ? ', RDC' : (el === 1 ? `, ${el}er` : `, ${el}ème`)
            }
          })
        }
      case 'lots':
        if (this.state.lots.length === 0) {
          return title
        } else {
          return this.processMessage(this.state.lots)
        }
      case 'date':
        if (this.state.date.length > 0) {
          return this.state.availableDates[this.state.date]
        } else {
          return 'Période'
        }
      default:
        return title
    }
  }

  getDate (key: number) {
    return this.state.availableDates[key] || 'Période'
  }

  filterLotsNames = (e: Object) => {
    if (e.target.value.length > 0) {
      let currentLots = this.state.currentLots
        .filter(lot => lot.value.indexOf(e.target.value) !== -1)
      this.setState({
        currentLots: currentLots
      })
    } else {
      this.filterLots()
    }
  }

  render () {
    let tooltips = []
    this.state.currentFilters.map((filter, key) => tooltips.push(this.getTitle(filter.name, filter.title)))
    return (
      <div className='row-flex statistics-filters'>
        {this.state.currentFilters.map((filter, key) =>
          <div className='col' key={key} style={column}>
            <label htmlFor='floors' style={{display: 'block'}}>{filter.label}&nbsp;:</label>
            <ButtonGroup>
              <ButtonToolbar>
                <Dropdown style={{width: '100%'}} id={`dropdown-${key}`} bsRole='toggle'>
                  <CustomToggle noCaret bsRole={'toggle'}>
                    {this.getTitle(filter.name, filter.title)}
                  </CustomToggle>
                  <CustomMenu rootCloseEvent='click' open={false} style={{width: '100%', zIndex: 1000}} bsRole='menu'>
                    <div style={dropdown}>
                      {filter.name !== 'lots' && filter.values.map((value, k) =>
                        <MenuItem key={k} value={value.value} eventKey={k}
                          onClick={() => this.updateFiltered(filter.name, value.value)} style={menuLink}>
                          {value.label}
                          {(this.state.floors.includes(value.value) || this.state.type.includes(value.value)) && (
                            <i className='fa fa-check' aria-hidden='true'>&nbsp;</i>
                          )}
                        </MenuItem>
                      )}
                      {filter.name === 'lots' && (
                        <MenuItem key={key}>
                          <FormControl
                            type='text'
                            placeholder='Filtrer les lots'
                            name={filter.name}
                            style={textFilter}
                            onChange={this.filterLotsNames}
                          />
                        </MenuItem>
                      )}
                      {filter.name === 'lots' && this.state.currentLots.map((value, k) =>
                        <MenuItem key={k} value={value.value} eventKey={k}
                          onClick={() => this.filterItems(value.value, filter.name)} style={menuLink}>
                          {value.label}
                          {(this.state.lots.includes(value.value)) && (
                            <i className='fa fa-check' aria-hidden='true'>&nbsp;</i>
                          )}
                        </MenuItem>
                      )}
                    </div>
                  </CustomMenu>
                </Dropdown>
              </ButtonToolbar>
            </ButtonGroup>
          </div>
        )}
        <div className='col' style={{...column, alignSelf: 'flex-end', maxWidth: '20%'}}>
          <button className='btn btn-primary' id='resetFilter' name='resetFilter' style={{height: '50px'}}
            onClick={() => this.setData(this.state.currentFilters)}>
            <i className='fa fa-times' aria-hidden='true'>&nbsp;</i>Réinitialiser les filtres
          </button>
        </div>
      </div>
    )
  }
}

const column = {
  display: 'flex',
  flexFlow: 'column nowrap',
  justifyContent: 'flex-end',
  maxWidth: '20%'
}

const menuLink = {
  color: '#333',
  padding: '9px 0',
  display: 'flex',
  justifyContent: 'space-between',
  transition: 'color 0.2s linear'
}

const textFilter = {
  margin: '0 0 5px 0',
  border: '1px solid #dedede',
  borderRadius: '2px',
  padding: '10px 10px',
  boxSizing: 'border-box',
  height: '40px'
}

const dropdown = {
  width: '100%',
  padding: '10px 10px 0',
  maxHeight: '400px',
  overflow: 'scroll',
  boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
}

export default ChartsFilter
