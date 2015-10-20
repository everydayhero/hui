'use strict'

import ProgressBar from '../'

describe('ProgressBar', function() {
  it('renders progress', function() {
    let data = {
      goal: 100,
      progress: 50
    }
    let element = renderIntoDocument(<ProgressBar goal={ data.goal } progress={ data.progress }/>)
    let progress = findByClass(element, 'hui-ProgressBar__progress')
    let width = progress.getDOMNode().style.width

    width.should.equal('50%')
  })

  it('renders 0 if goal is 0', function() {
    let data = {
      goal: 0,
      progress: 50
    }
    let element = renderIntoDocument(<ProgressBar goal={ data.goal } progress={ data.progress }/>)
    let progress = findByClass(element, 'hui-ProgressBar__progress')
    let width = progress.getDOMNode().style.width

    width.should.equal('0%')
  })

  it('renders 0 if progress is 0', function() {
    let data = {
      goal: 100,
      progress: 0
    }
    let element = renderIntoDocument(<ProgressBar goal={ data.goal } progress={ data.progress }/>)
    let progress = findByClass(element, 'hui-ProgressBar__progress')
    let width = progress.getDOMNode().style.width

    width.should.equal('0%')
  })

  it('renders 100 if progress is greater than 100', function() {
    let data = {
      goal: 100,
      progress: 200
    }
    let element = renderIntoDocument(<ProgressBar goal={ data.goal } progress={ data.progress }/>)
    let progress = findByClass(element, 'hui-ProgressBar__progress')
    let width = progress.getDOMNode().style.width

    width.should.equal('100%')
  })
})
