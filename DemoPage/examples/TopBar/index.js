'use strict'

import React from 'react'
import TopBar from '../../../layout/TopBar'
import Masthead from '../../../layout/Masthead'
import UserAuth from '../../../layout/UserAuth'
var imagePath = './images/'

export default React.createClass({
  displayName: 'TopBarExample',

  render: function () {
    return (
      <div>
        <h3 className='DemoPage__h3' id='TopBar'>TopBar and MastHead</h3>
        <p className='DemoPage__p'>The top bar should be consistent across all applications and include a MastHead and UserAuth components. TopBarLinks are optional.</p>
        <div className='DemoPage__example'>
          <TopBar>
            <Masthead
              appName={'Example'}
              href='/'
              imagePath={imagePath} />
            <UserAuth signUpUrl='#' signInUrl='#' />
          </TopBar>
        </div>
      </div>
    </div>
    )
  }
})
