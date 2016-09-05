import React from 'react'
import AddressFieldset from '../../../forms/AddressFieldset'
import validation from '../../../lib/validation'

const { custom } = validation

const AddressFieldsetWithCustomValidation = () => (
  <div>
    <h3 className='DemoPage__h3' id='AddressFieldsetWithCustomValidation'>
      Address Fieldset (with custom validation)
    </h3>

    <AddressFieldset
      validations={{
        street_address: ['required', exampleValidator()],
        extended_address: [exampleValidator()],
        locality: ['required', exampleValidator()],
        region: ['required', exampleValidator()],
        country_name: ['required', exampleValidator()],
        postal_code: ['required', exampleValidator()]
      }}
    />
  </div>
)

const exampleValidator = () => {
  const noEs = (val) => !val.toLowerCase().includes('e')
  return custom(noEs, 'This field cannot include the letter \'e\'')
}

export default AddressFieldsetWithCustomValidation
