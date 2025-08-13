import { BrowserRouter } from 'react-router'
import './App.css'
import { BookingProvider } from './context/BookingContext'
import Footer from './layout/Footer/Footer'
import Header from './layout/Header/Header'
import Main from './layout/Main/Main'

function App() {
  return (
    <BookingProvider>

      <BrowserRouter>

        <Header />
        <Main />
        <Footer />

      </BrowserRouter>

    </BookingProvider>
  )
}

export default App
