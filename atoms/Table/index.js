import _ from 'lodash'
import React from 'react'
import classNames from 'classnames'

export default React.createClass({
  displayName: 'Table',
  propTypes: {
    rows: React.PropTypes.arrayOf(React.PropTypes.shape({
      data: React.PropTypes.array,
      status: React.PropTypes.oneOf([false, 'loading']),
      className: React.PropTypes.string
    })),
    headings: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      rows: [],
      headings: []
    }
  },

  renderCells (cellData) {
    return _.map(cellData, (cell, i) => {
      return (
        <td className='hui-Table__cell' key={`cell-${i}`}>
          { cell }
        </td>
      )
    })
  },

  renderRows () {
    return _.map(this.props.rows, (row, i) => {
      const classes = classNames({
        'hui-Table__row': true,
        'hui-Table__row--loading': row.status === 'loading'
      })

      return (
        <tr key={`row-${i}`} className={`${classes} ${row.className || ''}`}>
          { this.renderCells(row.data) }
        </tr>
      )
    })
  },

  renderHeaderCells () {
    return _.map(this.props.headings, heading => {
      return (
        <th className='hui-Table__header-cell' key={heading}>
          { heading }
        </th>
      )
    })
  },

  renderHead () {
    return (
      <thead className='hui-Table__head'>
        <tr>
          { this.renderHeaderCells() }
        </tr>
      </thead>
    )
  },

  render () {
    return (
      <table className='hui-Table'>
        { this.props.headings && this.renderHead() }
        <tbody className='hui-Table__body'>
          { this.renderRows() }
        </tbody>
      </table>
    )
  }
})
