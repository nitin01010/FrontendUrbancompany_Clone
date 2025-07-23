import Footer from './components/footer'
import Header from './components/header'
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const App = () => {

  const queryClient = new QueryClient(); 
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Outlet />
        <Footer />
      </QueryClientProvider>
    </div>
  )
}

export default App
