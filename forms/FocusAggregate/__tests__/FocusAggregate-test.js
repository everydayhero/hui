import sinon from 'sinon'
import FocusAggregate from '../'

const TestComponent = React.createClass({
  displayName: 'Nope',
  render () {
    return (
      <FocusAggregate
        { ...this.props }>
        <input type="text" ref="input1" />
        <input type="text" ref="input2" />
      </FocusAggregate>
    )
  }
})

describe('FocusAggregate', () => {
  context('when any focusable child receives focus', () => {
    it('calls props.onFocus', () => {
      const subject = sinon.spy()
      const element = renderIntoDocument(
        <TestComponent onFocus={ subject } />
      )
      const input = element.refs.input1.getDOMNode()
      Simulate.focus(input)
      expect(subject).to.be.called
    })
  })

  context('when any focusable child is blurred', () => {
    it('calls props.onBlur after 100ms', (done) => {
      const subject = sinon.spy()
      const element = renderIntoDocument(
        <TestComponent onBlur={ subject } />
      )
      const input = element.refs.input1.getDOMNode()
      Simulate.blur(input)
      expect(subject).not.to.be.called
      setTimeout(() => {
        expect(subject).to.be.called
        done()
      }, 100)
    })
  })

  context('when any focusable child is blurred then focussed within 100ms', () => {
    it('calls props.onFocus but not props.onBlur', (done) => {
      const subject = sinon.spy()
      const element = renderIntoDocument(
        <TestComponent onBlur={ subject } />
      )
      const input = element.refs.input1.getDOMNode()
      Simulate.blur(input)
      Simulate.focus(input)
      expect(subject).not.to.be.called
      setTimeout(() => {
        expect(subject).not.to.be.called
        done()
      }, 100)
    })
  })

  context('when blur events occur multiple times within 100 ms', () => {
    it('only calls props.onBlur once', (done) => {
      const subject = sinon.spy()
      const element = renderIntoDocument(
        <TestComponent onBlur={ subject } />
      )
      const input1= element.refs.input1.getDOMNode()
      const input2= element.refs.input1.getDOMNode()
      Simulate.blur(input1)
      Simulate.blur(input2)
      setTimeout(() => {
        expect(subject).to.be.calledOnce
        done()
      }, 100)
    })
  })

  describe('props.onFocus()', () => {
    it('has one argument: the event object', () => {
      const handleFocus = (e) => {
        expect(e.target.value).to.eq('WOOOOOT!')
      }
      const element = renderIntoDocument(
        <TestComponent onFocus={ handleFocus } />
      )
      const input1= element.refs.input1.getDOMNode()
      Simulate.focus(input1, { target: { value: 'WOOOOOT!' }})
    })
  })
})
