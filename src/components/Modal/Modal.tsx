import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import styles from './modal.module.css';

const modalRoot = document.getElementById('modal');

interface IModal {
	onClose?: () => void;
	onConfirm?: () => void;
    children: React.ReactChild
};

const ModalContent = ({children, onClose}: any) => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.innerWrapper}>
				<div className={styles.header}>
					<div className={styles.title}>
						Какая-то форма
					</div>
					<div
						className={styles.close} 
						onClick={onClose}
					>
						X
					</div>
				</div>
                {children}
            </div>
        </div>
    );
};

const Modal = (props: IModal) => {
	const [div] = useState(document.createElement('div'));

	useEffect(() => {
		modalRoot?.appendChild(div);
	}, [])

	useEffect(() => {
		return () => {
			modalRoot?.removeChild(div);
		}
	}, [])

	return (
		createPortal(<ModalContent {...props}>{props.children}</ModalContent>, div)
	);
};

export default Modal;