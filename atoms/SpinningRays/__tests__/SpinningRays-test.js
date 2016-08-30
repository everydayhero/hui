import Component from '../'
import { shallow } from 'enzyme'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component { ...props } />)

  it('renders', () => {
    subject().should.have.length(1)
  })
})
