var blurringTimer

export default {
  setFocus (value) {
    const { onFocus, onBlur } = this.props
    if (this.isMounted()) {
      this.setState({
        focused: value
      }, () => {
        if (value === true) {
          this.handleAggregateFocus && this.handleAggregateFocus()
          !!onFocus && onFocus()
        } else {
          this.handleAggregateBlur && this.handleAggregateBlur()
          !!onBlur && onBlur()
        }
      })
    }
  },

  startBlur () {
    clearTimeout(blurringTimer)
    blurringTimer = setTimeout(() => {
      this.setFocus(false)
    }, 100)
  },

  handleBlur() {
    this.startBlur()
  },

  handleFocus() {
    clearTimeout(blurringTimer)
    this.setFocus(true)
  }
}
