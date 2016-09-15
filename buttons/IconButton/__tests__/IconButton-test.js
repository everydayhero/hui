import { shallow } from 'enzyme'
import Component from '../'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component { ...props } />)

  it('renders an icon', () => {
    subject({ icon: 'check' }).html().should.contain('fa-check')
  })

  it('displays an optional label', () => {
    subject({ icon: 'check', label: 'testLabel'}).find('div').text().should.eql('testLabel')
  })

  it('executes an onClick callback onMouseDown and onTouchStart', () => {
    const onClick = sinon.spy()
    subject({ icon: 'check', onClick }).simulate('mousedown')
    onClick.should.have.been.called
  })
})
