'use strict'

import React from 'react'
import PageContent from '../../../layout/PageContent'
import AsyncAction from '../../../buttons/AsyncActionToggle'
import Button from '../../../buttons/Button'
import LeadCopy from '../../../typography/LeadCopy'
import sync from '../../../lib/sync'

export default React.createClass({
  displayName: 'PageContentExample',

  unsubscribe (bool) {
    let api = 'https://everydayhero-staging.com/api/v2/notification_options'
    let namespace = 'page_received_donation'
    let token = '62d35e46ee366be584e7d6529dd22077c021677d2efe21f03739dd30b39d3723'
    let url = `${api}/${namespace}?access_token=${token}&value=${bool}`
    return sync(url, 'put')
  },

  render () {
    return (
      <div>
        <h3 className='DemoPage__h3' id='PageForm'>PageContent</h3>
        <p className='DemoPage__p'>The PageContent should be consistent across all pages.</p>
        <h4 className='DemoPage__h4'>PageContent propTypes</h4>
        <ul className='DemoPage__ul'>
          <li className='DemoPage__li'>
            <span className='DemoPage__bold'>icon:</span> Icon to appear in banner at top of Content.
          </li>
        </ul>
        <PageContent icon='envelope-o'>
          <LeadCopy>Unsubscribe from updates about your new donations?</LeadCopy>
          <AsyncAction kind='cta' action={this.unsubscribe} pre_action_label='Unsubscribe' post_action_label='Undo' error_label='Connection lost: try again' />
          <Button kind='tertiary' label='Manage Subscriptions' />
        </PageContent>
      </div>
    )
  }
})
