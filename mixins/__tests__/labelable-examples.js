'use strict'

export default function (Component, props = {}) {
  describe('props.label', () => {
    context('when passed null', () => {
      it('doesn\'t render a label element', () => {
        const subject = renderIntoDocument(
          <Component
            {...props}
            label={null} />
        ).refs.label

        expect(subject).to.eq(undefined)
      })
    })

    context('when passed a string value', () => {
      it('renders a label element containing that string', () => {
        const subject = renderIntoDocument(
          <Component
            {...props}
            label='Yo' />
        ).refs.label.textContent

        expect(subject).to.eq('Yo')
      })
    })
  })
}
