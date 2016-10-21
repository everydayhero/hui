'use strict'

import React from 'react'
import LineGraph from '../../../graphs/LineGraph'

function getCollection (tick) {
  var collection = [{ series: [] }, { series: [] }, { series: [] }]
  var count = 0

  while (count < 50) {
    var value = (Math.abs(Math.sin(count + tick) * 5100000))
    var value2 = (Math.abs(Math.cos(count + tick) * 5100000))
    var value3 = (Math.abs(Math.sin(count + 5 + tick) * 3000000))

    collection[0].series.push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      'funds_raised': value
    })

    collection[1].series.push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      'funds_raised': value2
    })

    collection[2].series.push({
      date: new Date(2014, 1, count + tick, 0, 0, 0, 0).toISOString(),
      'funds_raised': value3
    })

    count++
  }

  return collection
}

export default React.createClass({
  displayName: 'LineGraphExample',

  getInitialState: function () {
    return {
      collection: getCollection(1),
      collectionValueKey: 'funds_raised',
      valueConverter: function (number) {
        return number / 100
      }
    }
  },

  render: function () {
    if (this.state.hide) {
      return false
    }

    return (
    <div>
      <h3 className='DemoPage__h3' id='LineGraph'>LineGraph</h3>
      <p>The line graph can render a stacked or combination graph as well as option for area fill or line only.</p>
      <div className='DemoPage__example--graph--lines'>
        <LineGraph {...this.state} line area={false} tipLabel='Fund raised' />
      </div>
      <div className='DemoPage__example--graph--stacked'>
        <LineGraph {...this.state} stacked tipLabel='Fund raised' />
      </div>
      <div className='DemoPage__example--graph--empty'>
        <LineGraph {...this.state} stacked tipLabel='Fund raised' emptyState />
      </div>
    </div>
    )
  }
})
