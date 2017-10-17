// @flow
import React from 'react'

type Props = {
  average: Object
}

const AverageItem = ({average}: Props) => (
  <div className='panel panel-mini' style={{marginTop: 0}}>
    <div className='panel-body'>
      <div className='row-flex' style={{alignItems: 'center'}}>
        <div className='col-6'>
          <small>
            {average.title}
          </small>
        </div>
        <div className='col-6'>
          <span className='module-overview-item-value' style={value}>{average.value}</span>
        </div>
      </div>
    </div>
  </div>
)

const value = {
  fontSize: '3rem',
  display: 'block',
  textAlign: 'right'
}

export default AverageItem
