'use strict'

export default {
  setValid: function(valid) {
    let onError = this.props.onError

    this.setState({
      hasError: !valid,
      waiting: false,
      valid
    }, function() {
      if (onError) { onError(!valid) }
    })
  },

  validate: function() {
    let props = this.props
    let value = this.state.value || ''
    let hasValue = !!value.trim()

    if (hasValue && props.validate) {
      this.setState({ waiting: true })
      props.validate(value, this.setValid)
    } else if (this.props.required) {
      this.setValid(hasValue)
    }
  }
}
