import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import axe from '@axe-core/react'

import App from './App'

import './styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
)

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000)
}
