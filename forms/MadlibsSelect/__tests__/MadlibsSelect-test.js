import { shallow } from 'enzyme'
import Component from '../'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component { ...props } />)

  it('renders', () => {
    const props = { options: ['this', 'is', 'a', 'test'], inputProps: { onChange: sinon.spy() } }
    subject(props).should.have.length(1)
  })

  it('lists options', () => {
    const props = { options: ['this', 'is', 'a', 'test'], inputProps: { onChange: sinon.spy() } }
    const el = subject(props)
    el.find('option').should.have.length(4)
    el.containsMatchingElement(<option key="is" value="is">is</option>).should.eql(true)
    el.find('pre').text().should.eql('this')
  })

  it('uses optional displayOptions', () => {
    const props = {
      options: ['this', 'is', 'a', 'test'],
      displayOptions: ['alternative', 'display', 'options'],
      inputProps: {
        onChange: sinon.spy()
      }
    }
    subject(props).containsMatchingElement(<option key="is" value="is">display</option>).should.eql(true)
  })

  it('uses optional displayValues', () => {
    const props = {
      options: ['this', 'is', 'a', 'test'],
      displayValue: 'testDisplayValue',
      inputProps: {
        onChange: sinon.spy()
      }
    }
    subject(props).find('pre').text().should.eql('testDisplayValue')
  })
})
