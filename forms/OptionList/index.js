'use strict';

import React from 'react'
import classnames from 'classnames'
import find from 'lodash/collection/find'
import Option from './Option'

const NullComponent = {
  getDOMNode() {
    return {
      offsetTop: 0,
      focus () {}
    }
  }
}

export default React.createClass({
  displayName: 'OptionList',

  propTypes: {
    options: React.PropTypes.array.isRequired,
    onSelection: React.PropTypes.func,
    Option: React.PropTypes.func,
    emptyLabel: React.PropTypes.string,
    layout: React.PropTypes.string,
    spacing: React.PropTypes.string
  },

  getDefaultProps () {
    return {
      Option,
      onSelection: () => {},
      emptyLabel: 'No options to display',
      layout: 'full',
      spacing: 'loose'
    }
  },

  getInitialState () {
    return {
      selected: this.props.selectedOption,
      selectionCandidate: this.props.selectedOption || this.props.options[0]
    }
  },

  componentDidMount () {
    let selectedAndCandidateRefs = this.getSelectedAndCandidateRefs()
    let scrollPos = selectedAndCandidateRefs.selected.option.getDOMNode().offsetTop
    this.refs.scrollContainer.getDOMNode().scrollTop = scrollPos
  },

  setSelected (option) {
    this.setState({
      selectionCandidate: option,
      selected: option
    }, () => {
      this.props.onSelection(option)
    })
  },

  setSelectionCandidate (option) {
    this.setState({
      selectionCandidate: option
    })
  },

  keyHandlers: {
    9() {
      this.setSelected(this.state.selected)
    },
    13(e) {
      e.preventDefault()
      this.setSelected(this.state.selectionCandidate)
    },
    32(e) {
      e.preventDefault()
      this.setSelected(this.state.selectionCandidate)
    },
    40(e, index) {
      e.preventDefault()
      let options = this.props.options
      let newIndex = index + 1 === options.length ? 0 : index + 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    },
    38(e, index) {
      e.preventDefault()
      let options = this.props.options
      let newIndex = index === 0 ? options.length - 1 : index - 1
      let option = options[newIndex]
      this.setSelectionCandidate(option)
    }
  },

  handleKeyDown (e) {
    let key = e.keyCode || e.which
    let options = this.props.options
    let currentOption = find(options, (option) => {
      return option.value === this.state.selectionCandidate.value
    })
    let index = options.indexOf(currentOption)

    if (this.keyHandlers[key]) {
      this.keyHandlers[key].call(this, e, index)
    }
  },

  isCandidate(option) {
    let candidate = this.state.selectionCandidate
    return candidate && (option.value === candidate.value)
  },

  isSelected(option) {
    let selected = this.state.selected
    return selected && (option.value === selected.value)
  },

  handleRadioChange (e, option) {
    if (e.target.checked) {
      e.target.focus()
      this.setSelected(option)
    }
  },

  getSelectedAndCandidateRefs () {
    let selected = this.state.selected
    let candidate = this.state.selectionCandidate

    return Object.keys(this.refs).reduce((result, ref) => {
      if (ref.match(/^option-component-/g)) {
        let option = this.refs[ref]
        let index = ref.split('-').pop()

        if (selected && (option.props.value === selected.value)) {
          let radio = this.refs[`option-radio-${index}`]
          result.selected = {
            option,
            radio
          }
        } else if (candidate && (option.props.value === candidate.value)) {
          let radio = this.refs[`option-radio-${index}`]
          result.candidate = {
            option,
            radio
          }
        }
      }
      return result
    }, {
      selected: {
        option: NullComponent,
        radio: NullComponent
      },
      candidate: {
        option: NullComponent,
        radio: NullComponent
      }
    })
  },

  _setFocus () {
    let selectedAndCandidateRefs = this.getSelectedAndCandidateRefs()
    selectedAndCandidateRefs.selected.radio.getDOMNode().focus()
    selectedAndCandidateRefs.candidate.radio.getDOMNode().focus()
  },

  focus () {
    let visibleCandidate = this.state.selectionCandidate &&
      find(this.props.options, (option) => {
        return this.state.selectionCandidate.value === option.value
      })

    if (!visibleCandidate) {
      this.setState({
        selectionCandidate: this.props.options[0]
      }, this._setFocus)
    } else {
      this._setFocus()
    }
  },

  renderOptions () {
    return this.props.options.map((option, index) => {
      let OptionClass = this.props.Option

      let classes = classnames({
        'hui-OptionListOption--candidate': this.isCandidate(option),
        'hui-OptionListOption--selected': this.isSelected(option)
      })

      return (
        <li key={ option.value }>
          <input
            ref={ `option-radio-${index}` }
            className="hui-OptionListOption__radio--hidden"
            type="radio"
            value={ option.value }
            checked={ this.isSelected(option) }
            onKeyDown={ this.handleKeyDown }
            id={ `option-list-item-${option.value}` }
            onChange={ (e) => this.handleRadioChange(e, option) }
            name="selected-option" />

          <label
            onMouseOver={ () => this.setSelectionCandidate(option) }
            className="hui-OptionListOption__radio-label" htmlFor={ `option-list-item-${option.value}` }>
            <OptionClass
              ref={ `option-component-${index}` }
              className={ classes }
              label={ option.label }
              value={ option.value }  />
          </label>
        </li>
      )
    })
  },

  renderEmptyState () {
    return (
      <li>
        <em className="hui-OptionListOption hui-OptionListOption--empty">{ this.props.emptyLabel }</em>
      </li>
    )
  },

  render () {
    let classes = classnames([
      this.props.className,
      'hui-OptionList--' + this.props.layout,
      'hui-OptionList--' + this.props.spacing,
      'hui-OptionList'
    ])
    return (
      <div className={ classes }>
        <div ref="scrollContainer" className="hui-OptionList__scroll-container">
          <ul className="hui-OptionList__list">
            { this.props.options.length ? this.renderOptions() : this.renderEmptyState() }
          </ul>
        </div>
      </div>
    )
  }
})
