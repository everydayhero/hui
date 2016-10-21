import Table from '../'

describe('Table component', () => {
  const mockProps = {
    rows: [
      { data: ['foo', 'bar', 'baz'], className: 'rowsAreCool' },
      { data: ['cat', 'rat', 'mat'], className: 'thug-row-4-life' }
    ],
    headings: ['Things', 'Stuff', 'Potatoes']
  }
  let component

  beforeEach(() => {
    component = renderIntoDocument(<Table {...mockProps} />)
  })

  it('renders a table', () => {
    const table = findByClass(component, 'hui-Table')
    table.tagName.should.equal('TABLE')
  })

  it('renders header cells', () => {
    const headerCells = scryByClass(component, 'hui-Table__header-cell')
    headerCells.length.should.equal(3)
    headerCells[0].textContent.should.equal('Things')
    headerCells[1].textContent.should.equal('Stuff')
    headerCells[2].textContent.should.equal('Potatoes')
  })

  it('renders table rows', () => {
    const tableRows = scryByClass(component, 'hui-Table__row')
    tableRows.length.should.equal(2)
    tableRows[0].className.should.contain('rowsAreCool')
    tableRows[1].className.should.contain('thug-row-4-life')
  })

  it('renders table cells', () => {
    const tableCells = scryByClass(component, 'hui-Table__cell')
    tableCells.length.should.equal(6)
    tableCells[0].textContent.should.contain('foo')
    tableCells[1].textContent.should.contain('bar')
    tableCells[2].textContent.should.contain('baz')
    tableCells[3].textContent.should.contain('cat')
    tableCells[4].textContent.should.contain('rat')
    tableCells[5].textContent.should.contain('mat')
  })
})
