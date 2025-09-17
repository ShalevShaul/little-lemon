import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './contexts/BookingContext'
import AppFooter from './layout/AppFooter/AppFooter'
import AppHeader from './layout/AppHeader/AppHeader'
import AppMain from './layout/AppMain/AppMain'
import { BookingFormProvider } from './contexts/FormContext'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { LoaderProvider } from './contexts/LoaderContext'
import { Toaster } from 'react-hot-toast'

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
              <Toaster
                position='bottom-center'
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#4b5e57e7',
                        color: '#fff',
                        fontWeight: 'bolder',
                        fontSize: '18px',
                        padding: '15px',
                    },
                }}
            />

            </BrowserRouter>

          </BookingFormProvider>
        </BookingProvider>
      </LoaderProvider>
    </ErrorBoundary>
  )
}

export default App
