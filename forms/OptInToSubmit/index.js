'use strict'

import SubmitOnce from '../SubmitOnce'
import Checkbox from '../Checkbox'
import cx from 'classnames'

export default React.createClass({
  displayName: 'OptInToSubmit',

  propTypes: {
    className: React.PropTypes.string,
    checkBoxProps: React.PropTypes.object.isRequired,
    submitOnceProps: React.PropTypes.object.isRequired
  },

  getDefaultProps() {
    return { className: '' }
  },

  getInitialState() {
    return { checked: false }
  },

  handleCheck(checked) {
    let { checkBoxProps } = this.props
    this.setState({ checked })
    checkBoxProps.onChange && checkBoxProps.onChange(checked)
  },

  render() {
    let { checkBoxProps, submitOnceProps, className } = this.props
    return (
      <div className={ cx('OptInToSubmit', className) }>
        <Checkbox { ...checkBoxProps } onChange={ this.handleCheck } />
        <SubmitOnce { ...submitOnceProps } disabled={ !this.state.checked } />
      </div>
    )
  }
})
