'use strict';

import './env'
import React from 'react'
import DemoPage from './DemoPage'
const content = document.getElementById('content')

global.React = React

React.render(<DemoPage/>, content)
