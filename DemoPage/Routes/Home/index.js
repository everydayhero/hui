'use strict'

import React from 'react'
import { Link } from 'react-router'

import GlobalNav from '../../../navigation/GlobalNav'
import TopBarExample from '../../examples/TopBar'
import PageFormExample from '../../examples/PageForm'
import DeltaArrow from '../../examples/DeltaArrow'
import LineGraph from '../../examples/LineGraph'
import Legend from '../../examples/Legend'
import Visualisation from '../../examples/DataVisualisation'
import TextInput from '../../examples/TextInput'
import ReadOnlyAddress from '../../examples/ReadOnlyAddress'
import AddressFieldset from '../../examples/AddressFieldset'
import AddressFieldsetWithLookup from '../../examples/AddressFieldsetWithLookup'
import AddressLookup from '../../examples/AddressLookup'
import Checkbox from '../../examples/Checkbox'
import TextArea from '../../examples/TextArea'
import SelectInput from '../../examples/SelectInput'
import SearchInput from '../../examples/SearchInput'
import UrlInput from '../../examples/UrlInput'
import UrlSearchSelect from '../../examples/UrlSearchSelect'
import PhoneInput from '../../examples/PhoneInput'
import DateInput from '../../examples/DateInput'
import DateSelect from '../../examples/DateSelect'
import FileInput from '../../examples/FileInput'
import Filter from '../../examples/Filter'
import FilterSelect from '../../examples/FilterSelect'
import ImageInput from '../../examples/ImageInput'
import ButtonExample from '../../examples/Button'
import FormRow from '../../examples/FormRow'
import Fieldset from '../../examples/Fieldset'
import LoadingProgress from '../../examples/LoadingProgress'
import FooterExample from '../../examples/Footer'
import TagList from '../../examples/TagList'
import AvatarInput from '../../examples/AvatarInput'
import FlashMessage from '../../examples/FlashMessage'
import Tabs from '../../examples/Tabs'
import Leaderboard from '../../examples/Leaderboard'
import RadioGroup from '../../examples/RadioGroup'
import TextAreaLite from '../../examples/TextAreaLite'
import IconButtons from '../../examples/IconButtons'

const IMG_PATH = '../../images/'

export default React.createClass({
  displayName: 'DemoPageHome',

  render() {
    return (
      <div className="DemoPage">
        <GlobalNav domain="everydayhero-staging.com" region="au" imgPath={ IMG_PATH } />

        <div className="DemoPage__content">
          <h2 className="DemoPage__h2" id="how-to-use">How To Use</h2>
          <p className="DemoPage__p">HUI documentation can be found on <a href="http://everydayhero.github.io/public-api-docs/hui">EDH docs</a></p>
          <h2 className="DemoPage__h2" id="layout">Layout</h2>
          <div className="DemoPage__group">
            <TopBarExample/>
            <LoadingProgress/>
            <FlashMessage/>
            <PageFormExample/>
            <FooterExample/>
          </div>

          <h2 className="DemoPage__h2" id="layout">Navigation</h2>
          <div className="DemoPage__group">
            <Tabs/>
          </div>

          <h2 className="DemoPage__h2" id="buttons">Buttons</h2>
          <div className="DemoPage__group">
            <ButtonExample/>
          </div>

          <h2 className="DemoPage__h2" id="graphs">Graphs</h2>
          <div className="DemoPage__group">
            <Visualisation />
            <LineGraph/>
            <Legend />
            <DeltaArrow/>
          </div>

          <h2 className="DemoPage__h2" id="forms">Forms</h2>
          <div className="DemoPage__group">
            <TextInput />
            <ReadOnlyAddress />
            <AddressLookup />
            <AddressFieldset />
            <AddressFieldsetWithLookup />
            <Checkbox />
            <TextArea />
            <SelectInput />
            <SearchInput />
            <UrlInput />
            <UrlSearchSelect />
            <PhoneInput />
            <DateInput />
            <DateSelect />
            <FileInput />
            <Filter />
            <FilterSelect />
            <ImageInput />
            <FormRow />
            <Fieldset />
            <TagList />
            <AvatarInput />
            <RadioGroup />
            <TextAreaLite />
            <IconButtons />
          </div>

          <h2 className="DemoPage__h2" id="forms">Leaderboard</h2>
          <div className="DemoPage__group">
            <Leaderboard/>
          </div>

          <h2 className="DemoPage__h2" id="wizard">Wizard</h2>
          <div className="DemoPage__group">
            <Link to="/wizard/1">Open Wizard</Link>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
})
