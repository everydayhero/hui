import React from 'react'
import Table from '../../../atoms/Table'

export default React.createClass({
  displayName: 'TableExample',

  tableCells () {
    return {
      rows: [
        { data: ['foo', 'bar', 'baz'], className: 'rowsAreCool' },
        { data: ['cat', 'rat', 'mat'], className: 'thug-row-4-life' }
      ],
      headings: ['Things', 'Stuff', 'Potatoes']
    }
  },

  render () {
    return (
    <div>
      <h3 className="DemoPage__h3" id="Table">Table</h3>
      <div className="DemoPage__example">
        <Table { ...this.tableCells() } />
      </div>
    </div>
    );
  }
});
