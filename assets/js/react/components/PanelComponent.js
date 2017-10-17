import React from 'react'
import PropTypes from 'prop-types'

const Panel = ({header, body, footer, style, mini}) => (
  <div>
    <Panel header={header} footer={footer} bsStyle={style}>
      {body}
    </Panel>
  </div>
)

Panel.propTypes = {
  header: PropTypes.any,
  body: PropTypes.any,
  footer: PropTypes.any,
  style: PropTypes.string,
  mini: PropTypes.bool
}

export default Panel
