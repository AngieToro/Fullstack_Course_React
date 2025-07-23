import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
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

 ReactDOM.createRoot(document.getElementById('root')).render(
  <App/>)