import { shallow } from 'enzyme'
import Component from '../'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component {...props} />)

  it('renders a value', () => {
    const props = { onChange: sinon.spy(), value: 'test value' }
    const el = subject(props)
    el.should.have.length(1)
    el.find('pre').text().should.eql(props.value)
    el.find('textarea').html().should.contain(props.value)
  })

  it('calls onChange handler with input text', () => {
    const onChange = sinon.spy()
    subject({ onChange }).find('textarea').simulate('change', 'this is the new test value')
    onChange.should.have.been.calledWith('this is the new test value')
  })
})
