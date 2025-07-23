import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import  store  from './store/store'
import App from './App'

//import axios from '../../json-server/node_modules/axios'

/* axios
  .get('http://localhost:3001/notes')
//then controlado de eventos que permite acceder a los datos
  .then(response => {
    const notes = response.data
    console.log('Response promise: ', response);
    console.log('Notes: ', notes);

    ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />)
}) */



/*
store.dispatch(
  {
    type: 'NEW_NOTE',
    payload: {
      content: 'the app state is in redux store',
      important: true,
      id: 1
    }
  }
)

store.dispatch(
  {
    type: 'NEW_NOTE',
    payload: {
      content: 'state changes are made with actions',
      important: false,
      id: 2
    }
  }
)

store.dispatch(
  {
    type: 'TOGGLE_IMPORTANCE',
    payload: {
      id: 2
    }
  }
)
*/

// la aplicación ahora se define como un elemento secundario de un componente Provider (proveedor)
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={ store }>
    <App />
  </Provider>
)