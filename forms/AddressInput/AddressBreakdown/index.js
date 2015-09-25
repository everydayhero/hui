'use strict';

var React           = require('react/addons');
var PureRenderMixin = React.addons.PureRenderMixin;
var cx              = require('react/lib/cx');
var I18nMixin       = require('../../../mixins/I18n');
var Input           = require('../../TextInput');
var Select          = require('../../SelectInput');
var countryList     = require('../CountrySelect/countries');

module.exports = React.createClass({
  displayName: 'AddressBreakdown',

  mixins: [I18nMixin, PureRenderMixin],

  propTypes: {
    address: React.PropTypes.object,
    region: React.PropTypes.object.isRequired,
    autoFocus: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    prefix: React.PropTypes.string,
    required: React.PropTypes.bool,
    validate: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      address: null,
      autoFocus: false,
      prefix: '',
      required: false,
      validate: function() {}
    };
  },

  handleCountryChange: function(val, obj) {
    this.props.onChange('country_name')(val);
    this.props.validate(val);
    this.props.onCountryChange(obj);
  },

  render: function() {
    var t = this.t;
    var props = this.props;
    var address = props.address;
    var iso = props.region.iso;
    var onChange = props.onChange;
    var prefix = props.prefix;
    var required = props.required;
    var validate = props.validate;
    var classes = cx({
      'AddressBreakdown': true,
      'AddressBreakdown--compact': props.spacing === 'compact',
      'AddressBreakdown--tight': props.spacing === 'tight',
      'AddressBreakdown--loose': props.spacing === 'loose'
    });
    return (
      <div className={ classes }>
        <Input
          autoFocus={ props.autoFocus }
          ref={ 'street_address' }
          key={ 'street_address' }
          name={ prefix + 'street_address' }
          label={ t('street_address', { scope: iso }) }
          value={ address.street_address }
          required={ required }
          showIcon={ false }
          spacing={ 'tight' }
          validate={ validate }
          onChange={ onChange('street_address') } />
        <Input
          key={ 'extended_address' }
          ref={ 'extended_address' }
          name={ prefix + 'extended_address' }
          label={ t('extended_address', { scope: iso }) }
          validate={ validate }
          value={ address.extended_address }
          showIcon={ false }
          spacing={ 'tight' }
          onChange={ onChange('extended_address') } />
        <Input
          key="locality"
          ref="locality"
          name={ prefix + 'locality' }
          label={ t('locality', { scope: iso }) }
          validate={ validate }
          value={ address.locality }
          layout="twoThirds"
          required={ required }
          showIcon={ false }
          spacing="tight"
          onChange={ onChange('locality') } />
        <Input
          key="region"
          ref="region"
          name={ prefix + 'region' }
          label={ t('region', { scope: iso }) }
          validate={ validate }
          value={ address.region }
          layout="third"
          showIcon={ false }
          spacing="tight"
          onChange={ onChange('region') } />
        <Select
          key="country_name"
          ref="country_name"
          name={ prefix + 'country_name' }
          valueKey="name"
          labelKey="name"
          label={ t('country_name', { scope: iso }) }
          value={ address.country_name }
          layout="twoThirds"
          required={ required }
          spacing="tight"
          options={ countryList }
          onChange={ this.handleCountryChange } />
        <Input
          key="postal_code"
          ref="postal_code"
          name={ prefix + 'postal_code' }
          label={ t('postal_code', { scope: iso }) }
          validate={ validate }
          value={ address.postal_code }
          layout="third"
          required={ required }
          showIcon={ false }
          spacing="tight"
          onChange={ onChange('postal_code') } />
        { props.children }
        <input type="hidden" name={ props.prefix + 'country_iso' } value={ iso } />
        <input type="hidden" name={ props.prefix + 'paf_validated' } value={ address.paf_validated } />
      </div>
    );
  },

  statics: {
    i18n: require('./i18n')
  }
});
