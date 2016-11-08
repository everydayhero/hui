import React from 'react'
import cx from 'classnames'
import Errors from '../InputErrors'
import Tooltip from '../../atoms/Tooltip'

const renderHint = ({hint}) => <Tooltip className='hui-Checkbox__hint' content={hint} />

const renderLabel = ({
  id,
  name,
  label,
  labelIsClickable
}) => (
  <label htmlFor={labelIsClickable && (id || name || 'checkbox')} className='hui-Checkbox__label'>
    {label}
  </label>
)

const renderInput = ({
  id,
  name,
  disabled,
  value,
  onBlur,
  onChange
}) => (
  <input
    id={id || name || 'checkbox'}
    name={name || id || 'checkbox'}
    className='hui-Checkbox__input'
    type='checkbox'
    checked={value}
    onBlur={({target: {checked}}) => onBlur(checked)}
    onChange={({target: {checked}}) => onChange(checked)}
    autoComplete='off'
    disabled={disabled}
  />
)

export default ({
  id,
  name,
  disabled = false,
  labelIsClickable = true,
  onChange = () => {},
  onBlur = () => {},
  value = false,
  label = '',
  hint = '',
  errors = []
}) => (
  <div className={cx({'hui-Input--error': errors.length > 0}, 'hui-Checkbox')}>
    {!!hint && renderHint({hint})}
    {renderInput({id, name, disabled, value, onBlur, onChange})}
    {renderLabel({id, name, label, labelIsClickable})}
    {!!errors.length && <Errors errors={errors} />}
  </div>
)
