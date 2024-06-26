import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PhotoDetailPage from './pages/PhotoDetail.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path="/photo-detail/:id" element={<PhotoDetailPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
