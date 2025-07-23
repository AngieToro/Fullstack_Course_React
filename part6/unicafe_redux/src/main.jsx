import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { legacy_createStore as createStore } from 'redux'
import countReduce from './reducer.js'

const store = createStore(countReduce)

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
    root.render(<App store= { store }/>)
}

console.log('Final State: ', store.getState())

renderApp()
store.subscribe(renderApp)