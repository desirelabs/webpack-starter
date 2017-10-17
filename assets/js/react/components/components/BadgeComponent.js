// @flow
import React from 'react'
import Colors from '../../styles/colorScheme'

type Props = {
  count: number,
  style: Object
}

const Badge = ({count, style}: Props) => (
  <span style={{...notifCount, ...style}}>
    {count}
  </span>
)

const notifCount = {
  position: 'relative',
  fontFamily: 'Avenir-Heavy, AvenirNext-Regular, Helvetica',
  top: '-9px',
  right: '15px',
  margin: 0,
  borderRadius: '9px',
  height: '18px',
  color: '#fff',
  background: 'linear-gradient(to bottom,' + Colors.red + ', ' + Colors.darkRed + ')',
  padding: '3px 4px 3px 5px',
  display: 'inline-block',
  minWidth: '18px',
  fontSize: '12px',
  fontWeight: 400,
  lineHeight: 1,
  textAlign: 'center',
  whiteSpace: 'nowrap'
}

export default Badge
