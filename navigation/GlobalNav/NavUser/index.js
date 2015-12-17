'use strict';

import 'console-polyfill'

import React from 'react'
import I18n from '../../../mixins/I18n'

import Button from '../../../buttons/Button'
import Icon from '../../../atoms/Icon'
import NavLink from '../NavLink'
import NavAccount from '../NavAccount'

import api from '../../../api'
import urls from '../../../urls'
import getJSON from '../../../lib/getJSON'
import isEmpty from 'lodash/lang/isEmpty'
import cx from 'classnames'

export default React.createClass({
  displayName: 'NavUser',

  mixins: [I18n],

  propTypes: {
    transparent: React.PropTypes.bool,
    domain: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    user: React.PropTypes.shape({
      name: React.PropTypes.string,
      image_url: React.PropTypes.string,
      page_ids: React.PropTypes.array
    }),
    onLoad: React.PropTypes.func,
    onMenuOpen: React.PropTypes.func
  },

  getDefaultProps() {
    return {
      transparent: false,
      user: {},
      onLoad: () => {},
      onMenuOpen: () => {}
    }
  },

  getInitialState() {
    return {
      user: this.props.user,
      loading: isEmpty(this.props.user)
    }
  },

  componentDidMount() {
    if (this.state.loading) {
      this.getUser().then(this.setUser).catch((err) => {
        console.warn(err)
        this.setState({ loading: false })
      })
    }
  },

  getUser() {
    return getJSON(api('user'), null, true)
  },

  setUser(data) {
    this.props.onLoad(data.dashboard_user)
    this.setState({
      user: data.dashboard_user,
      loading: false
    })
  },

  renderUser() {
    let user = this.state.user

    return (
      <a className="hui-NavUser__user" href={ urls('dashboard', this.props.domain, this.props.region) }>
        <span className="hui-NavUser__name">{ user.name }</span>
        <span className="hui-NavUser__avatar"><img src={ user.image_url } /></span>
      </a>
    )
  },

  render() {
    let props = this.props
    let state = this.state
    let domain = props.domain
    let transparent = props.transparent
    let t = this.t
    let noUser = !state.loading && isEmpty(state.user)
    let hasUser = !state.loading && !isEmpty(state.user)
    let classes = cx([
      props.transparent && 'hui-NavUser--transparent'
    ], 'hui-NavUser')

    return (
      <div className={ classes }>
        { state.loading && <Icon icon="circle-o-notch" className="hui-NavUser__loading" /> }

        { noUser && <Button kind={ transparent ? 'secondary' : 'cta' } inverse={ transparent } thin label={ t('register') } href={ urls('register', domain, props.region) } /> }

        { noUser && <NavLink transparent={ props.transparent } kind="cta" href={ urls('log_in', domain, props.region) } label={ t('log_in') } /> }

        { hasUser && this.renderUser() }

        { hasUser && <NavAccount transparent={ props.transparent } domain={ props.domain } region={ props.region } onOpen={ props.onMenuOpen } /> }
      </div>
    )
  },

  statics: {
    i18n: require('./i18n')
  }
})

