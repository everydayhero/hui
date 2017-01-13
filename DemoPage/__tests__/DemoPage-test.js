import { shallow } from 'enzyme'
import Page from '../'

describe('Demo Page', () => {
  it('should render Page', () => {
    const page = shallow(Page)
    page.should.exist
  })
})
