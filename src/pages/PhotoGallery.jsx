import { useState, useEffect } from 'react';
import "../App.css";
import 'boxicons';
import Logo from "../assets/Logo2.png"

function PhotoGallery() {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [topic, setTopic] = useState('');
    const [loading, setLoading] = useState(false);
    const accessKey = 'aqQn2C8eZfDPoS1ESA2wX0Lk4CkFnvAsqRB--EEOtfQ';

    const topics = [
        'Nature',
        'Technology',
        'Architecture',
        'Wallpapers',
        'Food',
        'Travel',
        'Animes',
        'Sports',
        'Animals',
        'Cars',
        'Sport',
    ];

    useEffect(() => {
        document.title = 'Home | Instok'

        const fetchPhotos = async () => {
            setLoading(true);
            try {
                let url = `https://api.unsplash.com/photos/?client_id=${accessKey}&page=${page}&per_page=100`;
                if (query) {
                    url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&per_page=100&query=${encodeURIComponent(query)}`;
                } else if (topic) {
                    url = `https://api.unsplash.com/search/photos/?client_id=${accessKey}&page=${page}&per_page=100&query=${encodeURIComponent(topic)}`;
                }
                const response = await fetch(url);
                const data = await response.json();
                const newPhotos = query || topic ? data.results : data;
                setPhotos(prevPhotos => {
                    if (page === 1) {
                        return newPhotos;
                    } else {
                        const filteredPhotos = newPhotos.filter(newPhoto => !prevPhotos.some(photo => photo.id === newPhoto.id));
                        return [...prevPhotos, ...filteredPhotos];
                    }
                });
            } catch (error) {
                console.error('Error al obtener fotos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPhotos();
    }, [page, query, topic]);

    const loadMorePhotos = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        setPhotos([]);
        setPage(1);
        setTopic('');
    };

    const handleTopicChange = (newTopic) => {
        setPhotos([]);
        setPage(1);
        setTopic(newTopic);
        setQuery('');
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setTopic('');
    };

    const generateRandomName = (length) => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    };

    const downloadPhoto = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            const randomName = generateRandomName(10);
            link.href = blobUrl;
            link.download = `${randomName}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Error al descargar foto:', error);
        }
    };

    return (
        <>
            <div>
                <div className='search-bar'>
                    <div className="logo">
                    <img src={Logo} alt="Logo" className='Logo'/>
                    <h1>InsTok</h1>
                    </div>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={query}
                            onChange={handleInputChange}
                            placeholder="Buscar fotos..."
                        />
                        <button type="submit">Buscar</button>
                    </form>
                </div>

                <div className="topics">
                    {topics.map(t => (
                        <button
                            key={t}
                            onClick={() => handleTopicChange(t)}
                            className={`filter ${topic.toLowerCase() === t.toLowerCase() ? 'selected' : ''}`}
                        >
                            {t}
                        </button>
                    ))}
                </div>
                <div className="photo-grid">
                    {photos.map(photo => (
                        <div key={photo.id} className="photo-item">
                            <img src={photo.urls.small} alt={photo.alt_description} />
                            <div className='photo-details'>
                                <div className='author-info'>
                                    <img src={photo.user.profile_image.small} alt={`${photo.user.username}'s profile`} className='author-avatar' />
                                    <p className='author-name'>{photo.user.name}</p>
                                </div>
                                <div className='button-container'>
                                    <button onClick={() => downloadPhoto(photo.urls.full)}>
                                        <box-icon type='solid' name='download' color='#202020'></box-icon>
                                    </button>
                                    <a href={`photodetail/${photo.id}`} className="view-full-size">
                                        <box-icon name='send' type='solid' color='#202020'></box-icon>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='btn-container'>
                    <button onClick={loadMorePhotos} disabled={loading} className='learn-more'>
                        <span className="circle" aria-hidden="true">
                            <span className="icon arrow"></span>
                        </span>
                        <span className="button-text">Cargar mas</span>
                    </button>
                </div>
            </div>
        </>
    );
}

export default PhotoGallery;