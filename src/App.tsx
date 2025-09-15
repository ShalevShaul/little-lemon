import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './context/BookingContext'
import AppFooter from './layout/AppFooter/AppFooter'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
import { BookingFormProvider } from './context/FormContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BookingProvider>
        <BookingFormProvider>


          <BrowserRouter basename='/'>

            <Header />
            <Main />
            <AppFooter />

          </BrowserRouter>

        </BookingFormProvider>
      </BookingProvider>
    </ErrorBoundary>
  )
}

export default App
