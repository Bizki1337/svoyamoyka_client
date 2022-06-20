import Introduction from './Frames/Introduction/Introduction';
import AboutUs from './Frames/AboutUs/AboutUs';
import Header from 'components/Header/Header';
import Cleaning from './Frames/Cleaning/Cleaning';
import Cars from './Frames/Cars/Cars';
import Footer from './Frames/Footer/Footer';

import styles from './homePage.module.css';

const HomePage = () => {
    return (
        <div className={styles.wrapper}>
            <Header isProfile={false} />
            <Introduction />
            <AboutUs />
            <Cleaning />
            <Cars />
            <Footer />
        </div>
    );
};

export default HomePage;