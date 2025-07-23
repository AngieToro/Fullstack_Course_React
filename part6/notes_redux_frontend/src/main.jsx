import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import  store  from './store/store'
import App from './App'

// la aplicación ahora se define como un elemento secundario de un componente Provider (proveedor)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <App />
  </Provider>
)