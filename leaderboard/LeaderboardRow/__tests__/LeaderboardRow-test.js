'use strict'

import LeaderboardRow from '../'
import testData from './testData.json'

describe('LeaderboardRow', function() {
  it('renders a row', function() {
    let element = renderIntoDocument(<LeaderboardRow index={ 0 } data={ testData } valueType="money" valueSymbol="$"/>)

    findByClass(element, 'hui-LeaderboardRow__pageName').textContent.should.contain(testData.name)
    findByClass(element, 'hui-LeaderboardRow__charityName').textContent.should.contain(testData.charity_name)
    findByClass(element, 'hui-LeaderboardRow__raised').textContent.should.contain('$2521.50 raised of $5000')
    findByClass(element, 'hui-LeaderboardRow__value').textContent.should.contain('$2521.50')
  })

  it('highlights on select', function() {
    let element = renderIntoDocument(<LeaderboardRow index={ 0 } data={ testData } valueType="money" valueSymbol="$" isSelected />)
    findByClass(element, 'hui-LeaderboardRow--selected')
  })
})
