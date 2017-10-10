// @flow
import React from 'react'

type Props = {
  count: number
}

const Tick = ({count}: Props) => (
  <div>
    Ticks : {count}
  </div>
)

export default Tick
