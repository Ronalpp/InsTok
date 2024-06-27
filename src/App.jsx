import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PhotoDetailPage from './pages/PhotoDetail.jsx';

function App() {
    return (
    <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photodetail/:id" element={<PhotoDetailPage />} />
            </Routes>
    </BrowserRouter>
    );
}

export default App;
