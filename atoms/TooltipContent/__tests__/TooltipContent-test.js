import { shallow } from 'enzyme'
import TooltipContent from '../'

describe('TooltipContent', () => {
  it('applies a class when set to open', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="center"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--open')).to.equal(true)
  })

  it('applies a class when style is set to light', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="center"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--light')).to.equal(true)
  })

  it('applies a class when style is set to dark', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="dark"
        position="center"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--dark')).to.equal(true)
  })

  it('applies a class when position is set to left', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="left"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--left')).to.equal(true)
  })

  it('applies a class when position is set to right', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="right"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--right')).to.equal(true)
  })

  it('applies a class when position is set to center', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="center"
        content="foobar" />
    )

    expect(wrapper.hasClass('hui-TooltipContent--center')).to.equal(true)
  })

  it('can render a string as child content', () => {
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="left"
        content="foobar" />
    )

    expect(wrapper.text()).to.equal('foobar')
  })

  it('can render a node as child content', () => {
    const content = <span className="customContentNode">Life is good inside a span tag</span>
    const wrapper = shallow(
      <TooltipContent
        open={ true }
        style="light"
        position="left"
        content={ content } />
    )

    expect(wrapper.find('.customContentNode').type()).to.equal('span')
    expect(wrapper.find('.customContentNode').text()).to.equal('Life is good inside a span tag')
  })
})
