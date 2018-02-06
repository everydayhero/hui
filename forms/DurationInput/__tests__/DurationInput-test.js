import {shallow} from 'enzyme'

import DurationInput from '../'

const DEFAULT_PROPS = {
  name: 'test',
  id: 'test'
}

const setup = (props = {}) => (
  shallow(<DurationInput {...DEFAULT_PROPS} {...props} />)
)

describe('DurationInput', () => {
  describe('onChange', () => {
    it('should return the given duration as a number', () => {
      let passedValue
      const input = setup({
        onChange: (value) => {
          passedValue = value
        }
      })

      input.find('#test_hours').simulate('change', {target: {value: '1'}})

      passedValue.should.be.a('number')
    })

    it('should pass the total duration in seconds', () => {
      let passedValue
      const input = setup({
        onChange: (value) => {
          passedValue = value
        }
      })

      // 1 hr
      input.find('#test_hours').simulate('change', {target: {value: '1'}})

      passedValue.should.equal(3600)

      // 1 hr 12 min
      input.find('#test_minutes').simulate('change', {target: {value: '12'}})

      passedValue.should.equal(4320)

      // 1 hr 12 min 13s
      input.find('#test_seconds').simulate('change', {target: {value: '13'}})

      passedValue.should.equal(4333)
    })
  })
})
