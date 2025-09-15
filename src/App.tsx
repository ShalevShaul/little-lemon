import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './context/BookingContext'
import AppFooter from './layout/AppFooter/AppFooter'
import AppHeader from './layout/AppHeader/AppHeader'
import AppMain from './layout/AppMain/AppMain'
import { BookingFormProvider } from './context/FormContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <BookingFormProvider>


          <BrowserRouter basename='/'>

            <AppHeader />
            <AppMain />
            <AppFooter />

          </BrowserRouter>

        </BookingFormProvider>
      </BookingProvider>
    </ErrorBoundary>
  )
}

export default App
