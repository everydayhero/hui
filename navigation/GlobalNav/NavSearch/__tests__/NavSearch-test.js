'use strict'

let modal = sinon.spy()
let NavSearch = mockrequire('../', {
  '../../../lib/renderModal': modal,
  '../../../search/AggregateSearchModal': 'testModal'
})
let onFocus = sinon.spy()
let defaultProps = {
  kind: 'mobile',
  name: 'testSearch',
  region: 'au',
  label: 'Test Search',
  onFocus
}

describe('NavSearch', () => {
  let search = renderIntoDocument(<NavSearch { ...defaultProps }/>)

  it('renders a label and input', () => {
    findByClass(search, 'hui-NavSearch__label').getDOMNode().htmlFor.should.equal(defaultProps.name)
    let input = search.refs.input.getDOMNode()
    input.id.should.equal(defaultProps.name)
  })

  it('executes onFocus callback', () => {
    let input = search.refs.input.getDOMNode()
    Simulate.focus(input)
    onFocus.should.have.been.calledWith(true)
    findByClass(search, 'hui-NavSearch--focused').should.exist
    Simulate.blur(input)
    onFocus.should.have.been.calledWith(false)
  })

  it('launches an aggregate search modal', () => {
    let input = search.refs.input.getDOMNode()
    Simulate.focus(input)
    Simulate.change(input, { target: { value: 'dog' }})
    search.triggerSearch()
    modal.should.have.been.calledWith('testModal', {
      autoFocus: true,
      searchTerm: 'dog',
      country: 'au'
    })
  })
})
