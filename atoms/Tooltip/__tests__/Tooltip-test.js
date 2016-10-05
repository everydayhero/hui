import { shallow } from 'enzyme'
import Tooltip from '../'
import TooltipContent from '../../TooltipContent'
import Icon from '../../Icon'

describe('Tooltip', () => {
  it('renders a TooltipContent component as a child', () => {
    const wrapper = shallow(<Tooltip content="potato" />)
    expect(wrapper.find(TooltipContent)).to.exist
    expect(wrapper.find(TooltipContent).props()).to.eql({
      style: 'dark',
      position: 'left',
      content: 'potato',
      open: false
    })
  })

  it('renders an icon as a default trigger', () => {
    const wrapper = shallow(<Tooltip />)
    expect(wrapper.find('.hui-Tooltip__trigger')).to.exist
    expect(wrapper.find(Icon)).to.exist
    expect(wrapper.find(Icon).props().icon).to.equal('question-circle')
  })

  it('can render a custom trigger', () => {
    const wrapper = shallow(<Tooltip>click me</Tooltip>)
    expect(wrapper.find('.hui-Tooltip__trigger')).to.exist
    expect(wrapper.find('.hui-Tooltip__trigger').text()).to.equal('click me')
  })

  it('sets the tooltip to open when clicked', () => {
    const wrapper = shallow(<Tooltip />)
    const trigger = wrapper.find('.hui-Tooltip__trigger')

    expect(wrapper.state().open).to.be.false
    trigger.simulate('click')
    expect(wrapper.state().open).to.be.true
  })

  context('when the trigger is set to hover', () => {
    it('sets the tooltip to open when hovered', () => {
      const wrapper = shallow(<Tooltip trigger="hover" />)
      const trigger = wrapper.find('.hui-Tooltip__trigger')
      expect(wrapper.state().open).to.be.false

      trigger.simulate('mouseEnter')
      expect(wrapper.state().open).to.be.true
      trigger.simulate('mouseLeave')
      expect(wrapper.state().open).to.be.false
    })
  })
})
