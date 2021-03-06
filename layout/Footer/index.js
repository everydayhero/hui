'use strict'

import _ from 'lodash'
import React from 'react'
import I18n from '../../mixins/I18n'
import i18n from './i18n'
import Row from '../Row'
import A from '../../atoms/A'
import SocialMediaLinks from '../../atoms/SocialMediaLinks'
import urls from '../../urls'

export default React.createClass({
  displayName: 'Footer',

  mixins: [I18n],

  propTypes: {
    beneficiary: React.PropTypes.object,
    imagePath: React.PropTypes.string,
    domain: React.PropTypes.string,
    region: React.PropTypes.string
  },

  getDefautProps: function () {
    return {
      domain: 'everydayhero.com',
      region: 'au'
    }
  },

  getLinks: function (id, n) {
    var i = 0
    var t = this.t
    var links = {}
    var props = this.props
    var domain = props.domain
    var region = props.region

    while (i++ < n) {
      var name = id + '_' + i
      links[t(name)] = t(name + '_url', { portal: urls('portal', domain, region) })
    }

    return links
  },

  renderBeneficiaryLinks: function () {
    var beneficiary = this.props.beneficiary
    if (!beneficiary) { return false }
    return (
      <div className='hui-Footer__beneficiary'>
        { beneficiary.name && <span className='hui-Footer__beneficiaryInfo'>{ beneficiary.name }</span> }
        { beneficiary.tax_number && <span className='hui-Footer__beneficiaryInfo'>{ this.t('registration_number') } { beneficiary.tax_number }</span> }
        { beneficiary.website_url && <A className='hui-Footer__beneficiaryInfo' href={beneficiary.website_url}>{ this.t('website_cta') }</A> }
        { beneficiary.email && <A mailto={beneficiary.email} className='hui-Footer__beneficiaryInfo'>{ this.t('email_cta') }</A> }
        { beneficiary.phone && <span className='hui-Footer__beneficiaryInfo'>{ this.t('phone_label') } { beneficiary.phone }</span> }
      </div>
    )
  },

  renderLinks: function (links, className) {
    return _.map(links, function (d, key) {
      return <A className={'hui-Footer__' + className + 'Link'} href={d} key={d}>{ key }</A>
    })
  },

  renderLeftSiteLinks: function () {
    return <div className='hui-Footer__siteLinksLeft'>{ this.renderLinks(this.getLinks('left', 4), 'site') }</div>
  },

  renderRightSiteLinks: function () {
    return <div className='hui-Footer__siteLinksRight'>{ this.renderLinks(this.getLinks('right', 4), 'site') }</div>
  },

  renderLegalLinks: function () {
    return this.renderLinks(this.getLinks('legal', 4), 'legal')
  },

  render: function () {
    var domain = this.props.domain
    var region = this.props.region

    var socialMedia = [
      { name: 'facebook', url: urls('facebook', domain, region) },
      { name: 'twitter', url: urls('twitter', domain, region) },
      { name: 'google-plus', url: urls('google_plus', domain, region) },
      { name: 'instagram', url: urls('instagram', domain, region) },
      { name: 'pinterest', url: urls('pinterest', domain, region) }
    ]

    return (
      <div className='hui-Footer'>
        { this.renderBeneficiaryLinks() }

        <Row className='hui-Footer' level='primary'>
          <div className='hui-Footer__siteLinks'>
            { this.renderLeftSiteLinks() }

            <a href={urls('portal', domain, region)}><img className='hui-Footer__logo' src={this.props.imagePath} /></a>

            { this.renderRightSiteLinks() }
          </div>

          <div className='hui-Footer__legalLinks'>
            { this.renderLegalLinks() }

            <span className='hui-Footer__legalLink'>&copy;{ new Date().getFullYear() } { this.t('rights') }</span>
          </div>
          <SocialMediaLinks className='hui-Footer__socialMedia' links={socialMedia} />
        </Row>
      </div>
    )
  },

  statics: {
    i18n
  }
})
