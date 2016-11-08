import { mount } from 'enzyme'
import Input from '../'

describe('Checkbox', () => {
  describe('defaults', () => {
    const element = mount(<Input />)

    it('type of checkbox', () => {
      element.find('[type="checkbox"]').length.should.equal(1)
    })

    it('value of null', () => {
      element.html().should.not.contain('checked')
    })

    it('id of null', () => {
      element.find('#checkbox').length.should.equal(1)
    })

    it('name of null', () => {
      element.find('[name="checkbox"]').length.should.equal(1)
    })
  })

  describe('with clickable label', () => {
    const element = mount(<Input label={'free tacos'} />)

    it('contains a label', () => {
      element.find('.hui-Checkbox__label')
    })
  })

  describe('with tooltip hint', () => {
    const element = mount(
      <Input
        label={'free tacos'}
        hint='Test hint' />
    )

    it('contains a hint', () => {
      element.find('.hui-Checkbox__tip')
    })
  })

  describe('with non-clickable label', () => {
    const element = mount(
      <Input
        label={'free tacos'}
        labelIsClickable={false} />
    )

    it('label does not reference input id', () => {
      element.find('.hui-Checkbox__label').props().htmlFor.should.be.false
    })
  })

  describe('properties', () => {
    const element = mount(<Input value id='seven' />)

    it('type of checkbox', () => {
      element.find('[type="checkbox"]').length.should.equal(1)
    })

    it('value of true', () => {
      element.find('[type="checkbox"]').props().checked.should.be.true
    })

    describe('Passed an id of seven', () => {
      it('id is seven', () => {
        element.find('#seven').length.should.equal(1)
      })

      it('name is seven', () => {
        element.find('[name="seven"]').length.should.equal(1)
      })
    })
  })

  describe('onChange', () => {
    it('is fired onChange', () => {
      const onChange = sinon.spy()
      const element = mount(<Input onChange={onChange} />)
      const input = element.find('input')
      input.simulate('change', {target: {checked: true}})

      onChange.should.have.been.calledWith(true)
    })
  })

  describe('onBlur', () => {
    it('is fired onBlur', () => {
      const onBlur = sinon.spy()
      const element = mount(<Input onBlur={onBlur} />)
      const input = element.find('input')
      input.simulate('blur')

      onBlur.should.have.been.calledWith(false)
    })
  })

  describe('validation behavior', () => {
    it('when valid no hui-Input--error class', () => {
      const element = mount(<Input />)
      const errorClasses = element.find('.hui-Input--error')
      errorClasses.length.should.equal(0)
    })

    it('when invalid there is a hui-Input--error class', () => {
      const element = mount(<Input errors={['error']} />)
      const errorClasses = element.find('.hui-Input--error')
      errorClasses.length.should.equal(1)
    })

    it('shows errors', () => {
      const element = mount(<Input valid={false} errors={['foo']} />)
      const errorClasses = element.find('.hui-InputErrors')
      errorClasses.length.should.equal(1)
    })
  })
})
