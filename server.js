'use strict'

import express from 'express'
import compression from 'compression'
import morgan from 'morgan'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { match, RouterContext } from 'react-router'
import DemoPageRoutes from './DemoPage/Routes'

const app = express()

const staticPath = __dirname + '/dist/'
const port = Number(process.env.PORT || 8000)

app.use(compression())
app.use(morgan())

const sendStaticFile = name =>
  (req, res) => {
    match({ routes: DemoPageRoutes, location: req.path }, (error, redirectLocation, renderProps) => {
      let content = renderToString(React.createElement(RouterContext, renderProps))
      res.render(staticPath + name, { content })
    })
  }

app.use(express.static(staticPath))
app.get('/', sendStaticFile('index.ejs'))
app.get('*', sendStaticFile('index.ejs'))

app.listen(port, console.log.bind(this, 'Port: ' + port))
