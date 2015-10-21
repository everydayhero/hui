'use strict'

import Leaderboard from '../'
import LeaderboardRow from '../LeaderboardRow'
import testData from './testData.json'

describe('Leaderboard', function() {
  it('renders rows', function() {
    let element = renderIntoDocument(<Leaderboard rowData={ testData.leaderboard.pages } rowComponent={ LeaderboardRow }/>)
    let rows = scryByClass(element, 'hui-Leaderboard__row')

    rows.length.should.equal(9)
  })

  it('renders calls onSelect', function() {
    let spy = sinon.spy();
    let element = renderIntoDocument(<Leaderboard rowData={ testData.leaderboard.pages } rowComponent={ LeaderboardRow } onSelect={ spy }/>)
    let rows = scryByClass(element, 'hui-LeaderboardRow')
    Simulate.click(rows[0]);

    spy.should.have.been.called
  })
})
