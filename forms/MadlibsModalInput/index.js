import React, { PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import cx from 'classnames'
import { SlideVertical } from '../../atoms/Transitions'
import RoundButton from '../../buttons/RoundButton'
import { bindTouch, bindFocus } from '../../lib/eventUtils'
import css from '../../css'
import * as styles from './styles'

export default React.createClass({
  propTypes: {
    label: PropTypes.string.isRequired,
    autoClose: PropTypes.bool,
    inputClass: PropTypes.string
  },

  getInitialState() {
    return { modalOpen: false }
  },

  componentWillUnmount() {
    this.bindEvents(false)
  },

  componentWillUpdate(p, { modalOpen }) {
    if (this.state.modalOpen !== modalOpen) this.bindEvents(modalOpen)
  },

  bindEvents(toggle) {
    bindTouch(toggle, this.handleTouch)
    bindFocus(toggle, this.handleFocus)
  },

  handleTouch(e) {
    this.recentClick = true
    setTimeout(() => this.recentClick = false, 10)
    this.toggleInput(findDOMNode(this).contains(e.target))
  },

  handleFocus() {
    if (this.recentClick) return
    this.toggleInput(findDOMNode(this).contains(document.activeElement))
  },

  handleKeyDown() {
    this.recentKeydown = true
    setTimeout(() => this.recentKeydown = false, 10)
  },

  toggleInput(toggle) {
    toggle ? this.showModal() : this.hideModal()
  },

  showModal() {
    this.setState({ modalOpen: true })
  },

  hideModal() {
    setTimeout(this.setState.bind(this, { modalOpen: false }), 0)
  },

  autoClose() {
    if (this.props.autoClose && !this.recentKeydown) this.hideModal()
  },

  renderModal() {
    const { state: { modalOpen }, props: { children, inputClass } } = this
    return (
      <SlideVertical>
        { modalOpen && <span key="modal" className={ cx([css(styles.modal, modalOpen && styles.modalVisible), inputClass]) }>
          { children }
          <RoundButton key="close" icon="check" onClick={ this.hideModal } />
        </span> }
      </SlideVertical>
    )
  },

  render() {
    const { label } = this.props
    return (
      <div className={ css(styles.wrapper) } onKeyDown={ this.handleKeyDown } onChange={ this.autoClose }>
        <span className={ css(styles.label) } onFocus={ this.showModal } tabIndex={ !this.state.modalOpen ? 0 : -1 }>{ label }</span>
        { this.renderModal() }
      </div>
    )
  }
})
