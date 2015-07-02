"use strict";

var _ = require('lodash');
var React = require('react');
var I18n = require('../../mixins/I18n');
var Row = require('../Row');
var A = require('../../Helpers/A');
var SocialMediaLinks = require('../../Helpers/SocialMediaLinks');
var urls = require('../../urls');

module.exports = React.createClass({
  displayName: 'Footer',

  mixins: [I18n],

  propTypes: {
    beneficiary: React.PropTypes.object,
    domain: React.PropTypes.string,
    region: React.PropTypes.string
  },

  getDefautProps: function() {
    return {
      domain: 'everydayhero.com',
      region: 'au'
    };
  },

  renderBeneficiaryLinks: function() {
    var beneficiary = this.props.beneficiary;
    if (!beneficiary) { return false; }
    return (
      <div className="hui-Footer__beneficiary">
        { beneficiary.name && <span className="hui-Footer__beneficiaryInfo">{ beneficiary.name }</span> }
        { beneficiary.tax_number && <span className="hui-Footer__beneficiaryInfo">{ this.t('registration_number') } { beneficiary.tax_number }</span> }
        { beneficiary.website_url && <A className="hui-Footer__beneficiaryInfo" href={ beneficiary.website_url }>{ this.t('website_cta') }</A> }
        { beneficiary.email && <A mailto={ beneficiary.email } className="hui-Footer__beneficiaryInfo">{ this.t('email_cta') }</A> }
        { beneficiary.phone && <span className="hui-Footer__beneficiaryInfo">{ this.t('phone_label') } { beneficiary.phone }</span> }
      </div>
    );
  },

  getLinks: function(id, n) {
    var i = 0;
    var t = this.t;
    var links = {};
    while(i++ < n) {
      var name = id + '_' + i;
      links[t(name)] = t(name + '_url');
    }
    return links;
  },

  renderLinks: function(links, className) {
    return _.map(links, function(d, key) {
      return <A className={ "hui-Footer__" + className + "Link" } href={ d } key={ d }>{ key }</A>;
    });
  },

  renderLeftSiteLinks: function() {
    return <div className="hui-Footer__siteLinksLeft">{ this.renderLinks(this.getLinks('left', 4), 'site') }</div>;
  },

  renderRightSiteLinks: function() {
    return <div className="hui-Footer__siteLinksRight">{ this.renderLinks(this.getLinks('right', 4), 'site') }</div>;
  },

  renderLegalLinks: function() {
    return this.renderLinks(this.getLinks('legal', 4), 'legal');
  },

  render: function() {
    var domain = this.props.domain;
    var region = this.props.region;

    var socialMedia = [
      { name: 'facebook', url: urls.getUrl('facebook') },
      { name: 'twitter', url: urls.getUrl('twitter') },
      { name: 'google-plus', url: urls.getUrl('google_plus') },
      { name: 'instagram', url: urls.getUrl('instagram') },
      { name: 'pinterest', url: urls.getUrl('pinterest') }
    ];

    return (
      <div className="hui-Footer">
        { this.renderBeneficiaryLinks() }

        <Row className="hui-Footer" level="primary">
          <div className="hui-Footer__siteLinks">
            { this.renderLeftSiteLinks() }

            <a href={ urls.getUrl('portal', domain, region) }><img className="hui-Footer__logo" src="images/hui_edh_mark@x2.gif" /></a>

            { this.renderRightSiteLinks() }
          </div>

          <div className="hui-Footer__legalLinks">
            { this.renderLegalLinks() }

            <span className="hui-Footer__legalLink">&copy;{ new Date().getFullYear() } { this.t('rights') }</span>
          </div>
          <SocialMediaLinks className="hui-Footer__socialMedia" links={ socialMedia }/>
        </Row>
      </div>
    );
  },

  statics: {
    i18n: require('./i18n')
  }
});
