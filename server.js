'use strict';

import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import React from 'react/addons'

const app = express()

const ReactApp = React.createFactory(require('./DemoPage'))
const staticPath = __dirname + '/dist/'
const port = Number(process.env.PORT || 4000)

app.use(compression())
app.use(morgan())

const sendStaticFile = name =>
  (_, res) => {
    let content = React.renderToString(ReactApp({}))
    res.render(staticPath + name, { content })
  }

app.use(express.static(staticPath))
app.get('/', sendStaticFile('index.ejs'))
app.get('*', sendStaticFile('index.ejs'))

app.listen(port, console.log.bind(this, 'Port: ' + port))
