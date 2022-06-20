import introduction from 'assets/images/introduction.png';

import styles from './introduction.module.css';

const Introduction = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                <div className={styles.title}>
                    Профессиональная Мойка и Детейлинг
                </div>
                <div className={styles.subtitle}>
                    Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula 
                    eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, 
                    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, 
                    pretium quis, sem. Nulla consequat massa quis enim.
                </div>
            </div>
            <img 
                className={styles.img}
                src={introduction} 
                alt='car'
            />
        </div>
    );
};

export default Introduction;