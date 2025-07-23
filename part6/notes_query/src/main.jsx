import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.jsx'

const queryClient = new QueryClient()

console.log('queryClient: ', queryClient);


ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={ queryClient } >
    <App />
  </QueryClientProvider>
)
