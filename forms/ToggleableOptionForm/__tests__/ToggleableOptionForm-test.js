'use strict'

let options = {
  test_group_one: {
    label: 'Test Group One',
    values: {
      test_one: {
        label: 'Test Option One',
        value: false
      },
      test_two: {
        label: 'Test Option Two',
        value: true
      }
    }
  },
  test_group_two: {
    label: 'Test Group Two',
    values: {
      test_three: {
        label: 'Test Option Three',
        value: true
      },
      test_four: {
        label: 'Test Option Four',
        value: false
      }
    }
  }
}
let mockSync = sinon.stub().returns(Promise.resolve({ results: options }))
let ToggleableOptionForm = mockrequire('../', {
  '../../lib/sync': mockSync
})

describe('ToggleableOptionForm', () => {
  let props = {
    url: 'http://test.url',
    token: '123435',
    options
  }

  it('renders option groups', () => {
    let element = renderIntoDocument(<ToggleableOptionForm { ...props }/>)
    let text = element.getDOMNode().textContent
    text.should.contain('Test Group One')
    text.should.contain('Test Group Two')
  })

  it('synchronises changes with an external API', () => {
    let url = `${ props.url }/test_one?access_token=${ props.token }&value=true`
    let element = renderIntoDocument(<ToggleableOptionForm { ...props }/>)
    let input = scryByClass(element, 'ToggleableOption__hiddenInput')[1]
    input.getDOMNode().checked.should.be.false
    Simulate.change(input, { target: { checked: true }})
    mockSync.should.have.callCount(1)
    mockSync.should.have.been.calledWith(url, 'put')
  })
})