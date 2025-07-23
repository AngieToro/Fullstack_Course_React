import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './context/NotificationContext'
import { UserProvider } from './context/UserContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import './index.css'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={ queryClient } >
    <NotificationContextProvider>
      <UserProvider>
        <Router>
          <App />
        </Router>
      </UserProvider>
    </NotificationContextProvider>
  </QueryClientProvider>
)