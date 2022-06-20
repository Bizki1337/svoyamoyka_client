import { useEffect, useState } from 'react';

import Modal from 'components/Modal/Modal';
import Form from 'components/Form/FormContent/Form';

import styles from './book.module.css';

const Book = () => {

    const [isOpenModal, setIsOpenModal] = useState(false);

    useEffect(() => {
        if (isOpenModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }
    }, [isOpenModal])

    const toggleModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    return (
        <div className={styles.wrapper}>
            <button
                onClick={toggleModal} 
                className={styles.button}
            >
                Записаться
            </button>
            {
                isOpenModal && (
                    <Modal
                        onClose={toggleModal}
                    >
                        <Form onClose={toggleModal}/>
                    </Modal>
                )
            }
        </div>
    );
};

export default Book;