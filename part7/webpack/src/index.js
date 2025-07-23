import React from 'react'
import { createRoot } from 'react-dom/client'
import 'core-js/stable/index.js'
import 'regenerator-runtime/runtime.js'
import App from './App'
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(<App />)