'use strict'

import React from 'react'
import Button from '../Button'

export default React.createClass({
  displayName: 'AsyncActionToggle',

  propTypes: {
    action: React.PropTypes.func.isRequired,
    kind: React.PropTypes.string.isRequired,
    pre_action_label: React.PropTypes.node.isRequired,
    post_action_label: React.PropTypes.node.isRequired,
    error_label: React.PropTypes.node.isRequired,
    toggled: React.PropTypes.bool
  },

  getDefaultProps () {
    return { toggled: false }
  },

  getInitialState () {
    return {
      actionToggled: this.props.toggled,
      loading: false,
      error: false
    }
  },

  setError () {
    this.setState({ error: true })
  },

  setToggled () {
    this.setState({
      actionToggled: !this.state.actionToggled,
      error: false,
      loading: false
    })
  },

  handleAction () {
    this.setState({ loading: true, error: false })
    this.props.action(!this.state.actionToggled)
      .then(this.setToggled)
      .catch(this.setError)
  },

  render () {
    let { loading, actionToggled, error } = this.state
    let {
      kind,
      pre_action_label: preActionLabel,
      post_action_label: postActionLabel,
      error_label: errorLabel
    } = this.props
    let label = error ? errorLabel : actionToggled ? postActionLabel : preActionLabel
    let icon = error ? 'times' : loading ? 'circle-o-notch' : ''

    return <Button {...{ kind, label, icon }} onClick={this.handleAction} />
  }
})
