"use strict";

var protocol = 'https://';

var urls = {
  dashboard: 'https://{{ domain }}/dashboard',
  portal: {
    au: 'http://www.{{ domain }}/au/',
    ie: 'http://www.{{ domain }}/ie/',
    uk: 'http://www.{{ domain }}/uk/',
    us: 'http://www.{{ domain }}/us/',
    nz: 'http://www.{{ domain }}/nz/'
  },
  register: {
    au: 'http://give.{{ domain }}/au/get-started/',
    ie: 'http://give.{{ domain }}/ie/get-started/',
    uk: 'http://give.{{ domain }}/uk/get-started/',
    us: 'http://give.{{ domain }}/us/get-started/',
    nz: 'http://give.{{ domain }}/nz/get-started/'
  },
  log_in: {
    au: 'http://{{ domain }}/au/sign-in/',
    ie: 'http://{{ domain }}/ie/sign-in/',
    uk: 'http://{{ domain }}/uk/sign-in/',
    us: 'http://{{ domain }}/us/sign-in/',
    nz: 'http://{{ domain }}/nz/sign-in/'
  },
  twitter: {
    au: 'https://twitter.com/everydayhero',
    ie: 'https://twitter.com/everydayheroie',
    uk: 'https://twitter.com/everydayherouk',
    us: 'https://twitter.com/everydayherous',
    nz: 'https://twitter.com/everydayheronz'
  },
  facebook: {
    au: 'https://www.facebook.com/everydayhero',
    ie: 'https://www.facebook.com/everydayheroie',
    uk: 'https://www.facebook.com/everydayherouk',
    us: 'https://www.facebook.com/everydayherous',
    nz: 'https://www.facebook.com/everydayheronz'
  },
  google_plus: {
    au: 'http://gplus.to/everydayhero',
    ie: 'http://gplus.to/everydayheroie',
    uk: 'http://gplus.to/everydayherouk',
    us: 'http://gplus.to/everydayherous',
    nz: 'http://gplus.to/everydayhero'
  },
  instagram: {
    au: 'https://instagram.com/everydayhero',
    ie: 'https://instagram.com/everydayheroie',
    uk: 'https://instagram.com/everydayherouk',
    us: 'https://instagram.com/everydayherous',
    nz: 'https://instagram.com/everydayheronz'
  },
  pinterest: {
    au: 'https://www.pinterest.com/everydayhero',
    ie: 'https://www.pinterest.com/everydayheroie',
    uk: 'https://www.pinterest.com/everydayherouk',
    us: 'https://www.pinterest.com/everydayherous',
    nz: 'https://www.pinterest.com/everydayheronz'
  },
  supporter_domain: protocol + '{{ domain }}',
  charity_endpoint: protocol + '{{ domain }}/api/v2/charities/',
  user_endpoint: protocol + '{{ domain }}/quantified_dashboard/user'
};

module.exports = {
  getUrl: function(key, domain, region) {
    domain = domain || 'everydayhero.com';
    region = region || 'au';
    var url;
    if(urls[key]) {
      url = urls[key][region].replace('{{ domain }}', domain);
    }
    return url;
  }
};
