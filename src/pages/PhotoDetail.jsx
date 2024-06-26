import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/PhotoDetail.css'
import Footer from '../components/Footer.jsx'
import Header from '../components/Header.jsx'


function PhotoDetailPage() {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    const accessKey = 'aqQn2C8eZfDPoS1ESA2wX0Lk4CkFnvAsqRB--EEOtfQ';

    useEffect(() => {
        document.title = 'Detalle de la foto | Instok'

        const fetchPhoto = async () => {
            try {
                const response = await fetch(`https://api.unsplash.com/photos/${id}?client_id=${accessKey}`);
                if (response.ok) {
                    const data = await response.json();
                    setPhoto(data);
                } else {
                    console.error('Error al obtener foto:', response.statusText);
                }
            } catch (error) {
                console.error('Error al obtener foto:', error);
            }
        };

        fetchPhoto();
    }, [id]);

    const handleDownload = async (url) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = `${photo.id}.jpg`;
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
            <Header />
            <div className='main-container'>
                {photo ? (
                    <div className="photo-detail">

                        <img src={photo.urls.full} alt={photo.alt_description} />

                        <div className="photo-info">
                            <p>Descripción: <strong>{photo.alt_description}</strong></p>
                            <div className='author-detail'>
                                <img src={photo.user.profile_image.small} alt={`${photo.user.username}'s profile`} className='author-avatar' />
                                <strong>{photo.user.name}</strong>
                            </div>
                            <p>Descargas: <strong>{photo.downloads}</strong></p>
                            <button className="learn-more" onClick={() => handleDownload(photo.urls.full)}>
                                <span className="circle" aria-hidden="true">
                                    <span className="icon arrow"></span>
                                </span>
                                <span className="button-text">Descargar</span>
                            </button>
                        </div>

                    </div>
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
            <Footer />
        </>
    );
}

export default PhotoDetailPage;