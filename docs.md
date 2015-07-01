---
title: HUI (◠‿◠)
language_tabs:
toc_footers:
includes:
  - contact
search: false
---

# HUI (◠‿◠)

EDH UI library to share layout and components between EDH applications.

## Location

You can find the minified assets at the following locations:

- `//d1ig6folwd6a9s.cloudfront.net/hui-{{ latest-version }}.css`
– `//d1ig6folwd6a9s.cloudfront.net/hui-{{ latest-version }}/images/[image-name]`

To view the uncached version of deployed files go to:

- `https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}.css`
- `https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/images/[image-name]`

You can view the demo html file at:

- `[https://shared-scripts.s3.amazonaws.com/hui-1.1.21/index.html](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html)`

## Get Started

> Step 1: Include HUI in the dependencies of your package.json file

```javascript
"hui": "git://github.com/everydayhero/hui#[version]"
```

> Step 2: Require the hui component you require in your javascript

```javascript
var TextInput = require('hui/forms/TextInput');
```
> Step 3: Import the hui component sass you require in your sass file

```javascript
@import "../node_modules/hui/forms/TextInput/style";
```

## Layout

### TopBar and MastHead

> TopBar Example

```html
<TopBar>
  <Masthead appName={ "Example" } href="/" imagePath={ imagePath } fixed={ true } />
  <TopBarLink href="#how-to-use">How to use</TopBarLink>
  <TopBarLink href="#examples">HUI examples</TopBarLink>
  <UserAuth signUpUrl="#" signInUrl="#"/>
</TopBar>
```

The top bar should be consistent across all applications and include a MastHead and UserAuth components. TopBarLinks are optional.

#### PropTypes
- `appName` Optional application name to appear beside logo
- `href` Path to navigate user when clicking on logo)
- `imagePath` Path to logo image assets. 'hui_edh_logo@x2.gif' to optimise logo for screen resolutions.
- `fixed`</span> Fix the TopBar postion.

TopBar [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#TopBar)

### Page Form

> PageForm Example

```html
<PageForm
  pageName={ "Example" }
  backgroundImagePath={ backgroundImagePath }
  separatorImagePath={ separatorImagePath } >
  <TextInput
    className="hui-TextInput"
    id="demo_input_readonly"
    value="This is a readonly text input"
    readOnly={ true } />
  <Button kind="secondary" label="Sign In" icon="chevron-right"/>
</PageForm>
```

The PageForm is used to encapsulate singe page forms like donations and sign-in/up

#### PropTypes
- `pageName` Page name to appear at top of form.
- `backgroundImagePath` Path to background image.
- `separatorImagePath` Path to separator image.
- `children`</span> Any elements to be added to the form.

PageForm [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#PageForm)

### Loading Progress

Loading progress indicator design to give the impression of progress.

#### Proptypes

- `inProgress` [Boolean] Indicate request is in progress

```html
<LoadingProgress { 'inProgress={ true }/>
```

LoadingProgress [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#LoadingProgress)

## Buttons/Links

The button component can be used for links and buttons. There are four button kinds (CTA, Primary, Secondary and Tertiary). Each can be inverted or used as link with the `borderless` prop

If a href is passed, the button renders an anchor tag, if no href it renders a button. Both look identical.

To use the button component with ReactRouter, use the LinkButton wrapper.

> CTA Button Example

```html
<Button kind="cta" label="Get Started" icon="chevron-right"/>
```

### CTA Button
The call to action (CTA) is use for the most important and likely action a user should take. Idealy there would only be one CTA button in view. It does not have an inverse option.

### Primary Button
The Primary button is reserved for important actions that are not CTAs. Idealy there would only be one primary button in view.

### Secondary Button
The Seconday button is reserved for less important actions. Multiply Seconday buttons can be in view.

### Tertiary Button
The Tertiary button is reserved for less important actions. Multiply Tertiary buttons can be in view.

### Borderless Button
The borderless button can be used when you want all the functionality of a button, but the element needs to look like a link.

#### PropTypes
- `disabled` Disable button. Boolean, default false
- `href` Optional
- `kind` Button kind (cta, primary, secondary or tertiary)
- `icon` Optional FontAwesome font class to show. If this attribute is applied/removed the change will be animated.
- `iconLeft` Render icon on the left. Icons should apear on the right unless there is a particular use case for the icon appearing on the left. For example a 'previous' button.Boolean, default false.
- `iconSpin` Cause button icon to spin. Ideal for processing indicator
- `inverse` Invert button for better visibility on certain backgrounds
– `label` Text inside button
- `onClick` On click/touch callback function
- `thin` Optional thin version of button. Boolean, default false
– `type` Passed to button element (button - default, submit, reset)
- `uppercase` Optional uppercase text (When appropriate)

Buttons [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#Buttons)

## Graphs

### DataVisualisation

The HUI data visualisation is a combination of a number of graph component. These componets can also be used independantly.

> DataVisualisation Example

```html
<DataVisualisation
  series={ series }
  seriesValueKey={ seriesValueKey }
  total={ number }
  title={ string }
  legendLabels={ labels }
  delta={ delta }/>
```

> Example series structure
```javascript
[
  [
     { date: "2014-01-31T14:00:00.000Z",
       value: 20
     }, ...
  ], ...
]
```

#### PropTypes
- `series` Array of array of objects containing value and date
- `seriesValueKey` Accesor for value on data object
- `valueConverter` Convert to the value we want to display
- `stacked` Boolean. Defines a stacked line graph. Defaults to true
- `title` Graph Title
- `total` Total for defined period
- `legendLabels` Array of legend labels with indexes matching series
- `tipLabel` Defines the label of values on tooltip
- `delta` The percentage difference from a comparative period
- `totalFormat` Format structure for tooltip totals and total value (Leave blank to use default formatting)

DataVisualisation [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#DataVisualisation)

### LineGraph

The line graph can render a stacked or combination graph as well as option for area fill or line only.

> Example Line Graph

```html
<LineGraph
  collection={ collection }
  collectionValueKey{ collectionValueKey }
  line={ true }
  tipLabel={ "Fund raised" }
  area={ false } />
```

> Example collection structure
```javascript
[
  [
     { date: "2014-01-31T14:00:00.000Z",
       value: 20
     }, ...
  ], ...
]
```

#### PropTypes
- `collection` Array of array of objects containing value and date.
- `collectionValueKey` Accesor for value on data object
- `valueConverter` Convert to the value we want to display
- `stacked` Boolean. Defines a stacked line graph. Defaults to true
- `title` Graph Title
- `tipLabel` Defines the label of values on tooltip.
- `gutter` Defines the area around the graph for x and y scales. (Obejct) `{left: 0 right: 0 buttom: 0 top: 0}
- `totalFormat` Format structure for tooltip totals (Leave blank to use default formatting)
- `delta` The percentage difference from a comparative period
- `totalFormat` Format structure for tooltip totals and total value (Leave blank to use default formatting)

LineGraph [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#LineGraph)

### Legend

#### PropTypes
- `keys` Array of objects containing a label and an optional className that is added to the label.

> Example legend
```html
<Legend keys={ keys } />
```

> Example legend structure
```javascript
[
  { label: 'Campaign 1', className: 'exampleClass1' },
  { label: 'Campaign 2' },
  { label: 'Campaign 3' },
  { label: 'Campaign 4' },
  { label: 'Campaign 5' },
  { label: 'Campaign 6' },
  { label: 'Campaign 7' }
]
```

Legend [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#Legend)

### DeltaArrow

#### PropTypes
- `delta` Positive or negative float.
- `loading` Boolean. Makes the component appear as a grey box until the application is ready to display the delta

> Example delta arrow

```html
<DeltaArrow delta={ 0.5 } loading={ true } />
```

DeltaArrow [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#DeltaArrow)

## Forms

### TextInput

Basic text input.

#### PropTypes
- `autoComplete` [Boolean] – Allow browser auto complete to fill input (Default true)
- `storeLocally` [Boolean] – Store input values local to restore on page refresh (Default false)
- `autoFocus` [Boolean] – Set focus on input on render (Default false)
- `disabled` [Boolean] – Disable input (Default false)
- `showError` [Boolean] – Force errors to be displayed (Default false)
- `name` [String] - Field name (Optional)
- `serverErrors` [Array] - List of error message returned from server (Optional)
- `errorMessage` [String] – Message defined by client side validation to display on validation error (Optional)
- `hint` [String] – Text to display under input on feild focus (Optional)
- `placeHolder` [String] – Text to display in input if no other text is entered (Optional)
- `icon` [String] – Icon to appear on the right of the input (Optional)
- `mask` [Function] – Function to mutate input value on change (Optional)
- `onFocus` [Function] – Focus callback. Returns DOM element, input value and setValue method to update input (Optional)
- `onChange` [Function] – Change callback. Returns value of input (Optional)
- `onError` [Function] – On Error callback. returns error state boolean (Optional)
- `onBlur` [Function] – On Blue callback (Optional)
- `validate` [Function] – Validation callback to manage client side validation (Optional)
- `readOnly` [Boolean] – Set input to read only (Default false)
- `required` [Boolean] – Marks input to be required and ensures validation is run on blur (Default false)
- `showIcon` [Boolean] – Show or hide icon on right of input
- `spacing` [String one of "loose", "tight" or "compact"] – Layout options (Default loose)
- `type` [String] – Native input type attribute
- `value` [String, Intiger, Float] – Value of input
- `layout` [String one of "full", "wide", "half", "narrow" or "quarter"] – Defines input layout width (Default Full)

```html
<TextInput
  autoComplete={false}
  id='demo_input'
  value={ this.state.form.demo_input }
  label='Hint'
  placeHolder='This is a placeholder'
  onChange={ change('demo_input') } />
```

TextInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#TextInput)

### ReadOnlyAddress

Read only address input (Contactinates address values with ",").

#### PropTypes
(See [TextInput](./#TextInput) )

```html
<ReadOnlyAddress id={ name } value={ address } />
```

ReadOnlyAddress [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#ReadOnlyAddress)

### Checkbox

Basic checkbox with label

#### PropTypes
- `id` [String] Optional
- `value` [Boolean] Default false
- `disabled` [Boolean] Default true
- `labelIsClickable` [Boolean] Default false
- `onChange` [Function] On change callabck. Returns true/false. (Optional)
- `onBlur` [Function] On blur callabck. Returns true/false. (Optional)

```html
<CheckboxInput
  id="terms"
  value={ this.state.form.terms }
  label="Terms and Conditions"\n ' }
  onChange={ change("terms") } />
```

Checkbox [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#Checkbox)

### TextArea

Basic text area.

#### PropTypes
(See [TextInput](./#TextInput) )

```html
<TextArea
  className="Your-TextArea"
  id="description"
  value={ this.state.form.description }
  onChange={ change('description') }
  errors={ this.props.errors }/>
```

TextArea [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#TextArea)

### SelectInput

#### PropTypes
(See [TextInput](./#TextInput) )

```html
<SelectInput
  id="toys"
  onChange={ change('toys') }\n" }
  value={ this.state.form.toys }
  className="Toys__select"
  prompt="Please select your toy"
  options={ options } />
```

SelectInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#SelectInput)

### UrlInput
Allows for urls to be added with clearly defined protocols. Pasting full URLs with the protocol will automatically set the correct protocol in the dropdown.

#### PropTypes
(See [TextInput](./#TextInput) )

```html
<UrlInput
  id={ url }
  onChange={ change(url) }
  value={ this.state.form[url] }
  placeholder={ 'www.example.com' }
  errors={ this.props.errors && this.props.errors[url] } />
```

UrlInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#UrlInput)

### DateInput

#### PropTypes
- `minimumYear` [Number] Defaults to 1000. The earlist year that can be selected.
- `countryCode` [String - uk, us] Defaults to uk. Defines the excepted dates (dd/mm/yyyy).
- `valueFormat` [String] Defaults to YYYY-MM-DD. Defines the format the value will be recieved and returned in.
- `displayFormat` [String] Defaults to DD/MM/YYYY. Defines the format the value will be displayed in.

(For addtional props see [TextInput](./#TextInput) )

```html
<DateInput
  id="end_on"
  className="campaign__endOn"
  value={ this.state.form.end_on }
  placeholder={ "(dd/mm/yyyy)" }
  onChange={ change("end_on") }
  errors={ errors.start_on } />
```

DateInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#DateInput)

### DateSelect

#### PropTypes
- `months` – [array] i18n for month options
- `yearLabel` [string] label for year input
- `monthLabel` [string] label for month input
- `dateLabel` [string] label for date input
- `promptValue` [String yyyy-mm-dd] Date to show in select promp e.g(1989-12-12)

(For addtional props see [TextInput](./#TextInput) )

```html
<DateSelect
  id="end_on"
  className="campaign__endOn"
  value={ this.state.form.end_on }
  placeholder={ "(dd/mm/yyyy)" }
  onChange={ change("end_on") }
  errors={ errors.start_on } />
```

DateSelect [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#DateSelect)

### DateSelectWrapper
The DateSelectWrapper wraps the DateSelect input and renders a hidden input. This is useful for passing a single formated date back to the server from the three select inputs of the DateSelect

#### PropTypes
- `name` – [string] field name to return to server
(For addtional props see [DateSelect](./#TextInput) )

```html
<DateSelectWrapper
  value=""
  name="foo" />
```

### FileInput

File upload input that integrates with filepicker.io

#### PropTypes
- `mimetypes` Array ['image/*'] Allowed file upload types
- `services` Array ['CONVERT', 'COMPUTER'] List of services in filepicker.io (See [filepicker.io documents] (https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick?v=v2))
- `options` [Object]  Filepicker.io (See [filepicker.io documents] (https://www.filepicker.com/documentation/file_ingestion/javascript_api/pick?v=v2))
- `noFileLabel` String. Defaults to 'No file selected'. Displayed when no file is selected
(For addtional props see [TextInput](./#TextInput) )

```html
<FileInput
  id={ 'sample_file' }
  noFileLabel={ 'No file selected' }
  onChange={ change('sample_file') }
  value={ this.state.form.sample_file }
  errors={ this.props.errors && this.props.errors.sample_file } />
```
FileInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#FileInput)

### ImageInput

Extends FileInput to display image next to input

#### PropTypes
(See [FileInput](./#FileInput) )

ImageInput [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#ImageInput)

### FormRow

A form row combinds an input and a tip input a single row to be used in FeildSets and forms.

#### PropTypes
- `htmlFor` String - id of input to allow clicking on tip to focus input
- `tip` String - Tip text (optional)
- `id` String – Element id

```html
<FormRow htmlFor="example" tip="I'm very helpful.">
  <TextInput
    id='example'
    layout='half'
    value={ this.state.form.demo_input }
    label='An input'
    onChange={ change('demo_input') } />
</FormRow>
```

FormRow [Demo](https://shared-scripts.s3.amazonaws.com/hui-{{ latest-version }}/index.html#FormRow)

### Fieldset

The Fieldset component is design to encapsulate a series of FormRows and/or form inputs

#### PropTypes
- `legend` String - title of Fieldset

```html
<Fieldset legend="I'm a field set">
  <FormRow htmlFor="example" tip="I'm very helpful.">
    <TextInput
      autoComplete={false}
      id='example'
      layout='half'
      spacing='fitted'
      value={ this.state.form.demo_input_01 }
      label='An input'
      onChange={ change('demo_input_01') } />
  </FormRow>
</Fieldset>
```
