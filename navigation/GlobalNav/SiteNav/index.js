'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import I18n from '../../../mixins/I18n'
import i18n from './i18n'

import NavLink from '../NavLink'
import NavSearch from '../NavSearch'
import NavPages from '../NavPages'

import cx from 'classnames'

export default React.createClass({
  displayName: 'SiteNav',

  mixins: [I18n],

  propTypes: {
    transparent: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['mobile', 'desktop']).isRequired,
    portal: React.PropTypes.string.isRequired,
    registerUrl: React.PropTypes.string.isRequired,
    region: React.PropTypes.string.isRequired,
    hasUser: React.PropTypes.bool.isRequired,
    pages: React.PropTypes.array
  },

  getDefaultProps() {
    return {
      transparent: false,
      pages: [],
      getStartedUrl: ''
    }
  },

  getInitialState() {
    return { searchFocused: false }
  },

  onSearchFocus(searchFocused) {
    this.setState({ searchFocused })
  },

  render() {
    let props = this.props
    let kind = props.kind
    let loggedIn = props.hasUser
    let t = this.t
    let portal = props.portal
    let mobile = kind === 'mobile'
    let searching = mobile && this.state.searchFocused && ReactDOM.findDOMNode(this).offsetWidth < 400
    let classes = cx('hui-SiteNav', 'hui-SiteNav--' + kind )

    return (
      <div className={ classes }>
        <div className="hui-SiteNav__navLinks">
          { mobile && <NavSearch transparent={ props.transparent } kind={ kind } name={ 'global_search_' + kind } label="Search" onFocus={ this.onSearchFocus } region={ props.region } /> }

          { !searching && <NavLink transparent={ props.transparent } kind={ kind } href={ t('wonderwall_url', { portal }) } label={ t('wonderwall') } icon="bookmark-o" /> }

          { (!searching && !loggedIn) && <NavLink transparent={ props.transparent } kind={ kind } href={ t('nonprofit_url', { portal }) } label={ t('nonprofit') } icon="heart-o" /> }

          { !searching && <NavLink transparent={ props.transparent } kind={ kind } href={ t('help_url', { portal }) } label={ t('help') } icon="question-circle" /> }

          { !mobile && <NavSearch transparent={ props.transparent } kind={ kind } name={ 'global_search_' + kind } label="Search" region={ props.region } /> }

          { (!searching && loggedIn) && <NavPages transparent={ props.transparent } kind={ kind } pages={ props.pages } registerUrl={ props.registerUrl } /> }
        </div>
      </div>
    )
  },

  statics: {
    i18n
  }
});

