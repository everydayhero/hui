'use strict'

import React from 'react'
import classnames from 'classnames'
import bowser from 'bowser'
import TextInput from '../TextInput'
import Icon from '../../atoms/Icon'

let copiedTimer

export default React.createClass({
  displayName: 'CopyInput',
  propTypes: {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    label: React.PropTypes.string,
    labelCopied: React.PropTypes.string,
    labelCopy: React.PropTypes.string,
    labelSelect: React.PropTypes.string,
    layout: React.PropTypes.string,
    name: React.PropTypes.string,
    onBlur: React.PropTypes.func,
    onKeyDown: React.PropTypes.func,
    onTab: React.PropTypes.func,
    spacing: React.PropTypes.string,
    value: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      disabled: false,
      icon: null,
      id: null,
      label: 'Copy this value',
      labelCopied: 'Copied',
      labelCopy: 'Copy',
      labelSelect: 'Select',
      layout: 'full',
      name: null,
      onBlur() {},
      onKeyDown() {},
      onTab() {},
      readOnly: true,
      spacing: 'loose',
      type: 'text',
      value: ''
    }
  },

  getInitialState() {
    return { copied: false }
  },

  handleFocus({ inputElement }) {
    if (inputElement && inputElement.setSelectionRange) {
      inputElement.setSelectionRange(0, inputElement.value.length)
    }
  },

  selectAndCopy() {
    this.refs.copyInput.focus()

    try {
      document.execCommand('copy')
      this.setState({ copied: true })

      clearTimeout(copiedTimer)
      copiedTimer = setTimeout(() => {
        this.setState({ copied: false })
      }, 4000)
    } catch (error) {
      console.warn('Copy command is not supported in this browser')
    }
  },

  renderCopyButton() {
    const { labelCopy, labelCopied, labelSelect } = this.props
    const selectBlock = <span>{ labelSelect }</span>
    const copyBlock   = <span><Icon icon="clipboard" /> { labelCopy }</span>
    const copiedBlock = <span><Icon icon="check" /> { labelCopied }</span>
    let content

    /**
     * Sniffing for Safari since it doesn't support JS based
     * clipboard API's, or a reliable way to feature detect them.
     */
    const supportsCopy = (!bowser.safari && !bowser.ios)

    if (this.state.copied && supportsCopy) {
      content = copiedBlock
    } else if (supportsCopy) {
      content = copyBlock
    } else {
      content = selectBlock
    }

    return (
      <div className="hui-CopyInput__buttonWrapper">
        <button className="hui-CopyInput__button" onClick={ this.selectAndCopy }>
          { content }
        </button>
      </div>
    )
  },

  render() {
    const { className, layout, spacing } = this.props
    const classes = classnames([
      className,
      'hui-CopyInput--' + layout,
      'hui-CopyInput--' + spacing,
      'hui-CopyInput'
    ])

    return (
      <div className={ classes }>
        <div className="hui-CopyInput__wrapper">
          <div className="hui-CopyInput__input">
            <TextInput
              { ...this.props }
              ref="copyInput"
              spacing="compact"
              layout="full"
              onFocus={ this.handleFocus } />
          </div>
          { this.renderCopyButton() }
        </div>
      </div>
    )
  }
})
