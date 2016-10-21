import { mount } from 'enzyme'
import Component from '../'
const CWD = __dirname.split('/')[__dirname.split('/').length - 2]

describe(CWD, () => {
  const subject = (props = {}) => mount(<Component {...props} />)

  it('renders', () => {
    subject({ label: 'test' }).should.have.length(1)
  })

  it('shows modal on focus', () => {
    const el = subject({ label: 'test' })
    el.find('button').should.have.length(0)
    el.find('span').first().simulate('focus')
    el.find('button').should.have.length(1)
  })

  it('shows modal content', () => {
    const el = subject({ label: 'test', children: <div className='test' /> })
    el.find('.test').should.have.length(0)
    el.find('span').first().simulate('focus')
    el.find('.test').should.have.length(1)
  })
})
