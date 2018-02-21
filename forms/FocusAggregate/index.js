import React from 'react'

export default React.createClass({
  displayName: 'FocusAggregate',
  getDefaultProps () {
    return {
      onFocus: () => {},
      onBlur: () => {}
    }
  },
  componentWillUnmount () {
    clearTimeout(this.blurringTimer)
  },
  handleFocus (e) {
    clearTimeout(this.blurringTimer)
    this.props.onFocus(e)
  },
  handleBlur (e) {
    clearTimeout(this.blurringTimer)
    this.blurringTimer = setTimeout(() => {
      this.props.onBlur(e)
    })
  },
  render () {
    const { children, className } = this.props
    return (
      <div
        className={className}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}>
        { children }
      </div>
    )
  }
})
