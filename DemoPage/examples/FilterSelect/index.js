'use strict'

import React from 'react'
import FilterSelect from '../../../forms/FilterSelect'

export default React.createClass({
  displayName: 'FilterSelectExample',

  render () {
    let options = [
      { label: 'Fred Hollows Foundation', value: '1' },
      { label: 'Australian Red Cross', value: '2' },
      { label: 'Indigenous Literacy Foundation Indigenous Literacy Foundation', value: '3' },
      { label: 'Australian Men’s Shed Association Australian Men’s Shed Association', value: '4' },
      { label: 'Royal Flying Doctor Service Royal Flying Doctor Service', value: '5' },
      { label: 'Lifeline', value: '6' },
      { label: 'Fitted For Work', value: '7' },
      { label: 'Thin Green Line Foundation', value: '8' },
      { label: 'The Smith Family', value: '9' },
      { label: 'Exodus Foundation', value: '10' },
      { label: 'Fred Hollows Foundation', value: '11' },
      { label: 'Australian Red Cross', value: '12' },
      { label: 'Indigenous Literacy Foundation', value: '13' },
      { label: 'Australian Men’s Shed Association', value: '14' },
      { label: 'Royal Flying Doctor Service', value: '15' },
      { label: 'Lifeline', value: '16' },
      { label: 'Fitted For Work', value: '17' },
      { label: 'Thin Green Line Foundation', value: '18' },
      { label: 'The Smith Family', value: '19' },
      { label: 'Exodus Foundation', value: '20' },
      { label: 'Fred Hollows Foundation', value: '21' },
      { label: 'Australian Red Cross', value: '22' },
      { label: 'Indigenous Literacy Foundation', value: '23' },
      { label: 'Australian Men’s Shed Association', value: '24' },
      { label: 'Royal Flying Doctor Service', value: '25' },
      { label: 'Lifeline', value: '26' },
      { label: 'Fitted For Work', value: '27' },
      { label: 'Thin Green Line Foundation', value: '28' },
      { label: 'The Smith Family', value: '29' },
      { label: 'Exodus Foundation', value: '30' },
      { label: 'Fred Hollows Foundation', value: '31' },
      { label: 'Australian Red Cross', value: '32' },
      { label: 'Indigenous Literacy Foundation', value: '33' },
      { label: 'Australian Men’s Shed Association', value: '34' },
      { label: 'Royal Flying Doctor Service', value: '35' },
      { label: 'Lifeline', value: '36' },
      { label: 'Fitted For Work', value: '37' },
      { label: 'Thin Green Line Foundation', value: '38' },
      { label: 'The Smith Family', value: '39' },
      { label: 'Exodus Foundation', value: '40' },
      { label: 'Fred Hollows Foundation', value: '41' },
      { label: 'Australian Red Cross', value: '42' },
      { label: 'Indigenous Literacy Foundation', value: '43' },
      { label: 'Australian Men’s Shed Association', value: '44' },
      { label: 'Royal Flying Doctor Service', value: '45' },
      { label: 'Lifeline', value: '46' },
      { label: 'Fitted For Work', value: '47' },
      { label: 'Thin Green Line Foundation', value: '48' },
      { label: 'The Smith Family', value: '49' },
      { label: 'Exodus Foundation', value: '50' },
      { label: 'Fred Hollows Foundation', value: '51' },
      { label: 'Australian Red Cross', value: '52' },
      { label: 'Indigenous Literacy Foundation', value: '53' },
      { label: 'Australian Men’s Shed Association', value: '54' },
      { label: 'Royal Flying Doctor Service', value: '55' },
      { label: 'Lifeline', value: '56' },
      { label: 'Fitted For Work', value: '57' },
      { label: 'Thin Green Line Foundation', value: '58' },
      { label: 'The Smith Family', value: '59' },
      { label: 'Exodus Foundation', value: '60' },
      { label: 'Fred Hollows Foundation', value: '61' },
      { label: 'Australian Red Cross', value: '62' },
      { label: 'Indigenous Literacy Foundation', value: '63' },
      { label: 'Australian Men’s Shed Association', value: '64' },
      { label: 'Royal Flying Doctor Service', value: '65' },
      { label: 'Lifeline', value: '66' },
      { label: 'Fitted For Work', value: '67' },
      { label: 'Thin Green Line Foundation', value: '68' },
      { label: 'The Smith Family', value: '69' },
      { label: 'Exodus Foundation', value: '70' },
      { label: 'Fred Hollows Foundation', value: '71' },
      { label: 'Australian Red Cross', value: '72' },
      { label: 'Indigenous Literacy Foundation', value: '73' },
      { label: 'Australian Men’s Shed Association', value: '74' },
      { label: 'Royal Flying Doctor Service', value: '75' },
      { label: 'Lifeline', value: '76' },
      { label: 'Fitted For Work', value: '77' },
      { label: 'Thin Green Line Foundation', value: '78' },
      { label: 'The Smith Family', value: '79' },
      { label: 'Exodus Foundation', value: '80' },
      { label: 'Fred Hollows Foundation', value: '81' },
      { label: 'lowercase', value: '82' },
      { label: 'Indigenous Literacy Foundation', value: '83' },
      { label: 'Australian Men’s Shed Association', value: '84' },
      { label: 'Royal Flying Doctor Service', value: '85' },
      { label: 'Lifeline', value: '86' },
      { label: 'Fitted For Work', value: '87' },
      { label: 'Thin Green Line Foundation', value: '88' },
      { label: 'The Smith Family', value: '89' },
      { label: 'Exodus Foundation', value: '90' },
      { label: 'Fred Hollows Foundation', value: '91' },
      { label: 'Australian Red Cross', value: '92' },
      { label: 'Indigenous Literacy Foundation', value: '93' },
      { label: 'Australian Men’s Shed Association', value: '94' },
      { label: 'Royal Flying Doctor Service', value: '95' },
      { label: 'Lifeline', value: '96' },
      { label: 'Fitted For Work', value: '97' },
      { label: 'Thin Green Line Foundation', value: '98' },
      { label: 'The Smith Family', value: '99' },
      { label: '100 Exodus Foundation', value: '100' },
      { label: 'Fred Hollows Foundation', value: '101' },
      { label: 'Australian Red Cross', value: '102' },
      { label: 'Indigenous Literacy Foundation', value: '103' },
      { label: 'Australian Men’s Shed Association', value: '104' },
      { label: 'Royal Flying Doctor Service', value: '105' },
      { label: 'Lifeline', value: '106' },
      { label: 'Fitted For Work', value: '107' },
      { label: 'Thin Green Line Foundation', value: '108' },
      { label: 'The Smith Family', value: '109' },
      { label: 'Exodus Foundation', value: '110' }
    ]

    return (
      <div>
        <h3 className="DemoPage__h3" id="FilterSelect">FilterSelect</h3>

        <FilterSelect
          required
          errorMessage="Please select an option"
          value=" "
          sort="asc"
          options={ options } />

        <FilterSelect
          label={ null }
          value="2"
          options={ options } />
      </div>
    )
  }
})
