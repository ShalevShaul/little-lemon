import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './context/BookingContext'
import Footer from './layout/Footer/Footer'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'
import { BookingFormProvider } from './context/FormContext'

function App() {
  return (
    <BookingProvider>
      <BookingFormProvider>


        <BrowserRouter>

          <Header />
          <Main />
          <Footer />

        </BrowserRouter>

      </BookingFormProvider>
    </BookingProvider>
  )
}

export default App
