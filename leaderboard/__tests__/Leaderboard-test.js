'use strict'

import Leaderboard from '../'
import LeaderboardRow from '../LeaderboardRow'
import testData from './testData.json'

describe('Leaderboard', function() {
  it('renders rows', function() {
    let element = renderIntoDocument(<Leaderboard rowData={ testData.leaderboard.pages } rowComponent={ LeaderboardRow }/>)
    let rows = scryByClass(element, 'hui-LeaderboardRow')

    rows.length.should.equal(9)
  })
})
