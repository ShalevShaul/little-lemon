import './Main.css';
import Testimonails from '../../blocks/Testimonials/Testimonials';
import About from '../../blocks/About/About';
import Highlights from '../../blocks/Highlights/Highlights';
import { Navigate, Route, Routes } from 'react-router-dom';

function Main() {
    return (
        <main>
            <Routes>
                <Route path='/' element={<Navigate to={'/home'} />} />
                <Route path='/home' element={<></>} />
                <Route path='/highlights' element={<Highlights />}/>
                <Route path='/testimonials' element={<Testimonails />}/>
                <Route path='/about' element={<About />}/>
                <Route path='/all' element={<><Highlights /><Testimonails /><About /></>} />
            </Routes>
        </main>
    )
}

export default Main;