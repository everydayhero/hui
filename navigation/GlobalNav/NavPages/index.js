'use strict'

import React from 'react'
import I18n from '../../../mixins/I18n'
import i18n from './i18n'

import Icon from '../../../atoms/Icon'
import NavPagesPage from './NavPagesPage'

import map from 'lodash/map'
import isEmpty from 'lodash/isEmpty'
import cx from 'classnames'
import api from '../../../api'
import getJSON from '../../../lib/getJSON'
import { addEventBindings, removeEventBindings } from '../../../lib/eventUtils'

export default React.createClass({
  displayName: 'NavPages',

  mixins: [I18n],

  propTypes: {
    transparent: React.PropTypes.bool,
    kind: React.PropTypes.oneOf(['mobile', 'desktop']).isRequired,
    registerUrl: React.PropTypes.string.isRequired,
    pages: React.PropTypes.array
  },

  getDefaultProps () {
    return {
      transparent: false,
      pages: []
    }
  },

  getInitialState () {
    return {
      pages: [],
      open: false
    }
  },

  componentDidMount () {
    if (!isEmpty(this.props.pages)) {
      this.getPages().then(this.setPages)
    }
  },

  getPages () {
    return getJSON(api('page'), { ids: this.props.pages.join(','), limit: 5 })
  },

  setPages (data) {
    this.setState({ pages: data.pages })
  },

  open () {
    let open = !this.state.open
    this.setState({ open }, () => open && addEventBindings(['mousedown', 'touchstart'], this.handleClick))
  },

  close () {
    this.setState({ open: false }, () => {
      removeEventBindings(['mousedown', 'touchstart'], this.handleClick)
      setTimeout(() => this.refs.button.blur(), 15)
    })
  },

  handleClick (e) {
    if (!this.refs.list.contains(e.target || e.srcElement)) { this.close() }
  },

  renderPages () {
    return map(this.state.pages, (d, i) => {
      return <NavPagesPage page={d} key={i} />
    })
  },

  render () {
    let open = this.state.open
    let props = this.props
    let t = this.t
    let classes = cx({
      'hui-NavPages--transparent': props.transparent,
      'hui-NavPages--open': open
    }, 'hui-NavPages', 'hui-NavPages--' + props.kind)

    return (
      <div className={classes}>
        <div className='hui-NavPages__button' ref='button' onFocus={this.open} tabIndex='0'>
          <span className='hui-NavPages__label'>{ t('page_label') }</span>
          <Icon className='hui-NavPages__icon' icon='chevron-down' />
        </div>
        { open &&
          <div className='hui-NavPages__pageList' ref='list'>
            { this.renderPages() }
            <a className='hui-NavPages__create' href={props.registerUrl} onBlur={this.close}>{ t('register_label') }</a>
          </div>
        }
      </div>
    )
  },

  statics: {
    i18n
  }
})
