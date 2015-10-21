'use strict'

import LeaderboardRow from '../'
import testData from './testData.json'

describe('LeaderboardRow', function() {
  it('renders a row', function() {
    let element = renderIntoDocument(<LeaderboardRow index={ 0 } data={ testData } valueType="money" valueSymbol="$"/>)

    findByClass(element, 'hui-LeaderboardRow__pageName').getDOMNode().textContent.should.contain(testData.name)
    findByClass(element, 'hui-LeaderboardRow__charityName').getDOMNode().textContent.should.contain(testData.charity_name)
    findByClass(element, 'hui-LeaderboardRow__raised').getDOMNode().textContent.should.contain('$2521.50 raised of $5000')
    findByClass(element, 'hui-LeaderboardRow__value').getDOMNode().textContent.should.contain('$2521.50')
  })

  it('renders calls onSelect', function() {
    let spy = sinon.spy();
    let element = renderIntoDocument(<LeaderboardRow index={ 0 } data={ testData } valueType="money" valueSymbol="$" onSelect={ spy }/>)
    let row = findByClass(element, 'hui-LeaderboardRow')
    Simulate.click(row);

    spy.should.have.been.called
  })

  it('highlights on select', function() {
    let element = renderIntoDocument(<LeaderboardRow index={ 0 } data={ testData } valueType="money" valueSymbol="$" isSelected={ true }/>)
    findByClass(element, 'hui-LeaderboardRow--selected')
  })
})
