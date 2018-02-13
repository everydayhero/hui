import React from 'react'

import TextInput from '../TextInput'
import SimpleSelectInput from '../SimpleSelectInput'

const TextInputWithAttachedSelect = ({
  textInputProps = {},
  selectProps = {}
}) => (
  <div className='hui-TextInput__group'>
    <TextInput {...textInputProps} hasChild />

    <div className='hui-ChildInput'>
      <SimpleSelectInput {...selectProps} isChild />
    </div>
  </div>
)

export default TextInputWithAttachedSelect
