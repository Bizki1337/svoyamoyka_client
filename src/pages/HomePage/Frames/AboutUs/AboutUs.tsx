import aboutUsIMG from 'assets/images/aboutUs.png'

import styles from './aboutUs.module.css';

const AboutUs = () => {
    return (
        <div className={styles.wrapper}>
            <img
                className={styles.img}
                src={aboutUsIMG}
                alt='about us'
            />
            <div className={styles.content}>
                <div className={styles.title}>КТО МЫ ТАКИЕ?</div>
                <div className={styles.subtitle}>
                    Lorem Ipsum is simply dummy text of the printing 
                    and typesetting industry. Lorem Ipsum has been the industry's standard dummy text 
                    ever since the 1500s, when an unknown printer took a galley of type and scrambled 
                    it to make a type specimen book
                </div>
                <div className={styles.text}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div>
                <div style={{width: '75%', marginTop: '40px'}} className={styles.line} />
                <div className={styles.line} />
                <div style={{width: '50%'}} className={styles.line} />
            </div>
        </div>
    );
};

export default AboutUs;