'use strict';

var TagListItem = require('../');

describe('Tag List Item', () => {
  describe('default', () => {
    const item = { id: '1', name: 'foo' }
    const onIconClick = sinon.spy()
    let component

    beforeEach(() => {
      component = renderIntoDocument(
        <TagListItem
          item={ item }
          onIconClick={ onIconClick } />
      )
    })

    it('should render remove icon', () => {
      findByClass(component, 'hui-TagListItem__iconButton')
    })

    it('should call onIconClick when icon is clicked', () => {
      const icon = findByClass(component, 'hui-TagListItem__iconButton')
      TestUtils.Simulate.click(icon)

      onIconClick.should.have.been.called
    })
  })
})
