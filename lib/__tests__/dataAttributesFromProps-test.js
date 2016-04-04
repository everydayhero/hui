'use strict'

import dataAttributesFromProps from '../dataAttributesFromProps'

const testProps = {
  data: {
    test1: 'value1',
    test2: 'value2'
  }
}

describe('dataAttributesFromProps', () => {
  it('kebabCases data objects into JSX compatible attributes', () => {
    const subject = dataAttributesFromProps(testProps)
    subject['data-test-1'].should.eql('value1')
    subject['data-test-2'].should.eql('value2')
  })
})
