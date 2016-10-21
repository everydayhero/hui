'use strict'

import React from 'react'
import ToggleableOption from '../ToggleableOption'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import compact from 'lodash/compact'
import merge from 'lodash/merge'
import keys from 'lodash/keys'

export default React.createClass({
  displayName: 'ToggleableOptionGroup',

  propTypes: {
    onChange: React.PropTypes.func.isRequired,
    options: React.PropTypes.object.isRequired,
    name: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
  },

  isAllSelected () {
    let { options } = this.props
    return compact(map(options, o => o.value)).length === keys(options).length
  },

  isAllUnselected () {
    let { options } = this.props
    return compact(map(options, o => !o.value)).length === keys(options).length
  },

  handlePrimaryChange (name, checked) {
    forEach(this.refs, (d, k) => {
      k !== name && d.handleChange({ target: { checked }})
    })
    return Promise.resolve()
  },

  renderOption (option, name) {
    let optionProps = merge({ name, onChange: this.props.onChange, key: name, ref: name }, option)
    return <ToggleableOption {...optionProps} />
  },

  render () {
    let { options, name, label } = this.props
    let isSingleOption = keys(options).length === 1
    let primaryOptionProps = {
      [name]: {
        label,
        onChange: this.handlePrimaryChange,
        value: this.isAllSelected(),
        partialChecked: !this.isAllSelected() && !this.isAllUnselected()
      }
    }

    return (
      <div className='ToggleableOptionGroup'>
        <div className='ToggleableOptionGroup__PrimaryOption'>
          { map(isSingleOption ? options : primaryOptionProps, this.renderOption) }
        </div>
        { !isSingleOption && <div className='ToggleableOption__SecondaryOptions'>
          { map(options, this.renderOption) }
        </div> }
      </div>
    )
  }
})
