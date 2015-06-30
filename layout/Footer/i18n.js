'use strict';

var urls = require('../../../urls');
var portalUrl = urls.getUrl('portal');

module.exports = {
  en: {
    left_1: 'About',
    left_2: 'Jobs',
    left_3: 'Wonderwall',
    left_4: 'Contact',
    left_1_url: portalUrl + 'about/',
    left_2_url: portalUrl + 'jobs/',
    left_3_url: portalUrl + 'blog/',
    left_4_url: portalUrl + 'contact/',

    right_1: 'Press',
    right_2: 'Events',
    right_3: 'Nonprofits',
    right_4: 'Developers',
    right_1_url: portalUrl + 'press/',
    right_2_url: portalUrl + 'events/',
    right_3_url: portalUrl + 'nonprofits/',
    right_4_url: portalUrl + 'developers-giving-ecosystem/',

    legal_1: 'Privacy Policy',
    legal_2: 'Terms of Service',
    legal_3: 'Cookie Policy',
    legal_4: 'everydayhero is a Blackbaud service',
    legal_1_url: portalUrl + 'terms/privacy',
    legal_2_url: portalUrl + 'terms/',
    legal_3_url: portalUrl + 'terms/cookies',
    legal_4_url: "https://www.blackbaud.com/",

    registration_number: 'EIN:',
    phone_label: 'Phone:',
    email_cta: 'Email us',
    website_cta: 'Visit our website',
    rights: 'All Rights Reserved'
  },
  au: {
    left_1: 'About',
    left_2: 'Charities',
    left_3: 'Schools',
    left_4: 'Events',
    left_1_url: portalUrl + 'about/',
    left_2_url: portalUrl + 'charities/',
    left_3_url: portalUrl + 'schools/',
    left_4_url: portalUrl + 'fundraising-events-to-participate-in/',

    right_1: 'Wonderwall',
    right_2: 'Blog',
    right_3: 'Jobs',
    right_4: 'Contact',
    right_1_url: portalUrl + 'blog/',
    right_2_url: 'http://everydayherocommunity.com/',
    right_3_url: portalUrl + 'jobs/',
    right_4_url: portalUrl + 'contact/',

    legal_3: 'Ethics Policy',
    legal_3_url: portalUrl + 'ethics_policy',

    registration_number: 'ABN:'
  },
  nz: {
    left_1: 'About',
    left_2: 'Charities',
    left_3: 'Schools',
    left_4: 'Events',
    left_1_url: portalUrl + 'about/',
    left_2_url: portalUrl + 'charities/',
    left_3_url: portalUrl + 'schools/',
    left_4_url: portalUrl + 'fundraising-events-to-participate-in/',

    right_1: 'Wonderwall',
    right_2: 'Blog',
    right_3: 'Jobs',
    right_4: 'Contact',
    right_1_url: portalUrl + 'blog/',
    right_2_url: 'http://everydayherocommunity.com/',
    right_3_url: portalUrl + 'jobs/',
    right_4_url: portalUrl + 'contact/',

    legal_3: 'Ethics Policy',
    legal_3_url: portalUrl + 'ethics_policy',

    registration_number: 'IRD:'
  },
  us: {
    registration_number: 'EIN:',
    left_3: 'Blog'
  },
  ie: {
    registration_number: 'VAT:',
    right_3: 'Not for profits',
    right_4: 'Partners'
  },
  uk: {
    registration_number: 'VAT:',
    right_3: 'Not for profits',
    right_4: 'Partners'
  }
};
