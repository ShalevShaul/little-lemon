import './App.css';
import { BookingProvider } from './components/BookingContext';
import Layout from './Layout/Layout/Layout';


function App() {
  return (
    <BookingProvider>
      <Layout />
    </BookingProvider>
  );
}

export default App;
