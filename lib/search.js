'use strict'

import merge from 'lodash/merge'
import api from '../api'
import getJSON from './getJSON'

let pageOptions = { page: 1, page_size: 10 }

var giveCampaignUids = {
  'au': 'au-0',
  'ie': 'ie-0',
  'nz': 'nz-0',
  'uk': 'gb-0',
  'us': 'us-0'
}

export default {
  campaigns (params) {
    params = merge(pageOptions, params)
    params.searchTerm = encodeURIComponent(params.searchTerm)
    return getJSON(api('campaign_search'), params)
  },

  charities (params) {
    params = merge(pageOptions, params)
    params.searchTerm = encodeURIComponent(params.searchTerm)
    return getJSON(api('charity_search'), params)
  },

  pages (params) {
    params = merge(pageOptions, params)
    params.searchTerm = encodeURIComponent(params.searchTerm)
    return getJSON(api('page_search'), params)
  },

  all (params) {
    params = merge(pageOptions, params)
    params.searchTerm = encodeURIComponent(params.searchTerm)
    return getJSON(api('aggregate_search'), params)
  },

  isGivePage (page) {
    return page.campaign.uid &&
      page.campaign.uid === giveCampaignUids[page.country_code]
  }
}
