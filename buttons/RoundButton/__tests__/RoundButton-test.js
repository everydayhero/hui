import { shallow } from 'enzyme'
import Component from '../'
import css from '../../../css'
import { button, small } from '../styles'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]
const classNames = (el) => el.node.props.className

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component { ...props } />)

  it('renders an icon', () => {
    subject({ icon: 'check' }).html().should.contain('fa-check')
  })

  it('displays a regular size', () => {
    const regularClassName = css(button)
    classNames(subject({ icon: 'check' })).should.eql(regularClassName)
  })

  it('displays as small', () => {
    const smallClassName = css(button, small)
    classNames(subject({ icon: 'check', size: 'small' })).should.eql(smallClassName)
  })
})
