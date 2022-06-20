import logo from 'assets/icons/logo.svg';

import styles from './footer.module.css';

const Footer = () => {
    return (
        <div className={styles.wrapper}>
            <img src={logo} />
            Это футер сайта
        </div>
    );
};

export default Footer;