import '../css/Header.css';
import 'boxicons';

const Header = () => {
    return (
        <header className="custom-header">
            <a href="/">
                <box-icon name='chevrons-left' size='md'></box-icon>
            </a>
            <h1 className='title'>InsTok</h1>
        </header>
    );
};

export default Header;
