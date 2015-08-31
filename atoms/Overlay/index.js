'use strict'

import React from 'react'
import Icon from '../Icon'

import addClass from '../../lib/addClass'
import removeClass from '../../lib/removeClass'
import classnames from 'classnames';

export default React.createClass({
  displayName: 'Overlay',

  propTypes: {
    className: React.PropTypes.string,
    onClose: React.PropTypes.func,
    showCloseButton: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    scroll: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      className: '',
      showCloseButton: true,
      inverse: false,
      scroll: false
    }
  },

  componentWillMount() {
    addClass(document.body, 'hui-Overlay-open')
  },

  componentWillUnmount() {
    removeClass(document.body, 'hui-Overlay-open')
  },

  keyHandler(event) {
    if (event.key === 'Escape') {
      this.onClose(event)
    }
  },

  onClose(event) {
    event.preventDefault()
    if (this.props.onClose) {
      this.props.onClose()
    }
  },

  render() {
    var props = this.props;
    var classes = classnames([
      'hui-Overlay',
      props.inverse && 'hui-Overlay--inverse',
      props.scroll && 'hui-Overlay--scroll',
      props.className
    ]);
    var closeClasses = classnames(['hui-Overlay__close', props.inverse && 'hui-Overlay__close--inverse']);
    var closeButton = props.onClose && props.showCloseButton &&
      <a href="#" className={ closeClasses } onClick={ this.onClose }><Icon icon="times" /></a>

    return (
      <div className={ classes } onKeyDown={ this.keyHandler }>
        { closeButton }
        { props.children }
      </div>
    )
  }
})
