import { shallow } from 'enzyme'
import Component from '../'
import css from '../../../css'
import { radio, checkedRadio, checkedFocusedRadio } from '../styles'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]
const classNames = (el) => el.node.props.className

describe(CWD, () => {
  const subject = (props = {}) => shallow(<Component { ...props } />)
  it('renders a label', () => {
    const props = { id: 'test', label: 'testLabel', onChange: sinon.spy() }
    subject(props).text().should.eql('testLabel')
  })

  it('calls onChange handler with label', () => {
    const props = { id: 'test', label: 'testLabel', onChange: sinon.spy() }
    subject(props).find('input').simulate('change')
    props.onChange.should.have.been.calledWith('testLabel')
  })

  it('displays as unchecked when unchecked', () => {
    const uncheckedClassName = css(radio)
    const props = { id: 'test', label: 'testLabel', onChange: sinon.spy() }
    classNames(subject(props)).should.eql(uncheckedClassName)
  })

  it('displays as checked when checked', () => {
    const checkedClassName = css(radio, checkedRadio)
    const props = { id: 'test', label: 'testLabel', checked: true, onChange: sinon.spy() }
    classNames(subject(props)).should.eql(checkedClassName)
  })

  it('displays as checked and focused when checked and focused', () => {
    const checkedFocusedClassName = css(radio, checkedRadio, checkedFocusedRadio)
    const props = { id: 'test', label: 'testLabel', checked: true, focused: true, onChange: sinon.spy() }
    classNames(subject(props)).should.eql(checkedFocusedClassName)
  })
})
