import { mount } from 'enzyme'
import Component from '../'
import css from '../../../css'
import { group, focusedGroup } from '../styles'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]
const classNames = (el) => el.node.className

describe(CWD, () => {
  const subject = (props = {}) => mount(<Component { ...props } />)

  it('renders an array of radio inputs', () => {
    const props = { labels: ['this', 'is', 'a', 'test'], onChange: sinon.spy() }
    subject(props).find('input').should.have.length(4)
  })

  it('passes through onChange handler', () => {
    const props = { labels: ['this', 'is', 'a', 'test'], onChange: sinon.spy() }
    subject(props).find('input').first().simulate('change')
    props.onChange.should.have.been.calledWith('this')
  })

  it('executes onFocus and onBlur handlers', () => {
    const props = { labels: ['this', 'is', 'a', 'test'], onChange: sinon.spy(), onFocus: sinon.spy(), onBlur: sinon.spy() }
    subject(props).simulate('focus')
    props.onFocus.should.have.been.called
    subject(props).simulate('blur')
    props.onBlur.should.have.been.called
  })

  it('displays as unfocused when unfocused', () => {
    const unfocused = css(group)
    const props = { labels: ['this', 'is', 'a', 'test'], onChange: sinon.spy() }
    classNames(subject(props).find('div')).should.eql(unfocused)
  })

  it('displays as focused when focused', () => {
    const focused = css(group, focusedGroup)
    const props = { labels: ['this', 'is', 'a', 'test'], hasFocus: true, onChange: sinon.spy() }
    classNames(subject(props).find('div')).should.eql(focused)
  })
})
