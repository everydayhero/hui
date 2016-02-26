'use strict'

import React from 'react'
import I18n from '../../../mixins/I18n'
import i18n from './i18n'

import NavLink from '../NavLink'
import Icon from '../../../atoms/Icon'

import urls from '../../../urls'
import cx from 'classnames'
import { addListeners, removeListeners } from '../../../lib/bindEvents'

export default React.createClass({
  displayName: 'NavAccount',

  mixins: [I18n],

  propTypes: {
    transparent: React.PropTypes.bool,
    domain: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    onOpen: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transparent: false,
      onOpen: () => {}
    }
  },

  getInitialState() {
    return { open: false }
  },

  open() {
    let open = !this.state.open
    this.setState({ open }, () => open && addListeners(['mousedown', 'touchstart'], this.handleClick))
  },

  close() {
    this.setState({ open: false }, () => {
      removeListeners(['mousedown', 'touchstart'], this.handleClick)
      setTimeout(() => this.refs.button.blur(), 15)
    })
  },

  handleClick(e) {
    if (!this.refs.list.contains(e.target || e.srcElement)) { this.close() }
  },

  render() {
    let t = this.t
    let props = this.props
    let domain = props.domain
    let region = props.region
    let transparent = props.transparent
    let open = this.state.open
    let classes = cx({
      'hui-NavAccount--transparent': transparent,
      'hui-NavAccount--open': open
    }, 'hui-NavAccount')

    return (
      <div className={ classes }>
        <div className="hui-NavAccount__icon" onFocus={ this.open } tabIndex="0" ref="button">
          <Icon icon="bars" />
        </div>
        { open &&
          <div className="hui-NavAccount__menu" ref="list">
            <NavLink transparent={ transparent } kind="account" href={ urls('receipts', domain, region) } label={ t('receipts') } icon="file"/>
            <NavLink transparent={ transparent } kind="account" href={ urls('account', domain, region) } label={ t('account') } icon="user"/>
            <NavLink transparent={ transparent } kind="account" href={ urls('log_out', domain, region) } label={ t('logout') } icon="sign-out" onBlur={ this.close }/>
          </div>
        }
      </div>
    )
  },

  statics: {
    i18n
  }
})
