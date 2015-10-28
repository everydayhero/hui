'use strict'

let map = {
  user: `https://{{ domain }}/quantified_dashboard/user.json`,
  page: `https://{{ domain }}/api/v2/pages`,
  aggregate_search: `https://{{ domain }}/api/v2/search/aggregate`,
  campaign_search: `https://{{ domain }}/api/v2/search/campaigns`,
  charity_search: `https://{{ domain }}/api/v2/search/charities`,
  page_search: `https://{{ domain }}/api/v2/search/pages`,
  address: `https://{{ domain }}/api/v2/addresses`,
  addresses_search: `https://{{ domain }}/api/v2/addresses`
}

export default (key, domain) => {
  domain = domain || 'everydayhero.com'
  return map[key].replace('{{ domain }}', domain)
}
