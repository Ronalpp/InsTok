import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home.jsx';
import PhotoDetailPage from './pages/PhotoDetail.jsx';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/photo-detail/:id" element={<PhotoDetailPage />} />
            </Routes>
        </Router>
    );
}

export default App;
