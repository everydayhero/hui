'use strict';

import React from 'react'
import TopBar from '../layout/TopBar'
import TopBarLink from '../layout/TopBarLink'
import Masthead from '../layout/Masthead'
import TopBarExample from './examples/TopBar'
import PageFormExample from './examples/PageForm'
import DeltaArrow from './examples/DeltaArrow'
import LineGraph from './examples/LineGraph'
import Legend from './examples/Legend'
import Visualisation from './examples/DataVisualisation'
import TextInput from './examples/TextInput'
import ReadOnlyAddress from './examples/ReadOnlyAddress'
import Checkbox from './examples/Checkbox'
import TextArea from './examples/TextArea'
import SelectInput from './examples/SelectInput'
import UrlInput from './examples/UrlInput'
import DateInput from './examples/DateInput'
import DateSelect from './examples/DateSelect'
import FileInput from './examples/FileInput'
import ImageInput from './examples/ImageInput'
import ButtonExample from './examples/Button'
import FormRow from './examples/FormRow'
import Fieldset from './examples/Fieldset'
import LoadingProgress from './examples/LoadingProgress'
import FooterExample from './examples/Footer'

const imagePath = './images/';

export default React.createClass({
  displayName: 'DemoPage',

  render() {
    return (
      <div className="DemoPage">
        <TopBar fixed={ true }>
          <Masthead
            appName={ "HUI (◠‿◠)" }
            href="/"
            imagePath={ imagePath } />
            <TopBarLink href="#how-to-use">How to use</TopBarLink>
            <TopBarLink href="#layout">Layout</TopBarLink>
            <TopBarLink href="#buttons">Buttons</TopBarLink>
            <TopBarLink href="#graphs">Graphs</TopBarLink>
            <TopBarLink href="#forms">Forms</TopBarLink>
        </TopBar>

        <div className="DemoPage__content">
          <h2 className="DemoPage__h2" id="how-to-use">How To Use</h2>
          <p className="DemoPage__p">HUI documentation can be found on <a href="http://everydayhero.github.io/public-api-docs/hui">EDH docs</a></p>
          <h2 className="DemoPage__h2" id="layout">Layout</h2>
          <div className="DemoPage__group">
            <TopBarExample/>
            <LoadingProgress/>
            <PageFormExample/>
            <FooterExample/>
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
            <Checkbox />
            <TextArea />
            <SelectInput />
            <UrlInput />
            <DateInput />
            <DateSelect />
            <FileInput />
            <ImageInput />
            <FormRow />
            <Fieldset />
          </div>
        </div>
      </div>
    );
  }
});
