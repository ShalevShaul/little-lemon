import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './contexts/BookingContext'
import AppFooter from './layout/AppFooter/AppFooter'
import AppHeader from './layout/AppHeader/AppHeader'
import AppMain from './layout/AppMain/AppMain'
import { BookingFormProvider } from './contexts/FormContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { LoaderProvider } from './contexts/LoaderContext'

function App() {
  return (
    <ErrorBoundary>
      <LoaderProvider>
        <BookingProvider>
          <BookingFormProvider>


            <BrowserRouter basename='/'>

              <AppHeader />
              <AppMain />
              <AppFooter />

            </BrowserRouter>

          </BookingFormProvider>
        </BookingProvider>
      </LoaderProvider>
    </ErrorBoundary>
  )
}

export default App
