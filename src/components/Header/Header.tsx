import { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import cn from 'classnames';

import Modal from 'components/Modal/Modal';
import Form from 'components/Form/FormContent/Form';

import headerIMG from 'assets/images/header.png';

import logoSVG from 'assets/icons/logo.svg';

import styles from './header.module.css';

interface IHeader {
    isProfile?: boolean;
}

const Header = ({
    isProfile,
}: IHeader) => {

    const navigate = useNavigate();

    // example: () => navigate('/menu')

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isOpenModalReg, setIsOpenModalReg] = useState(false);
    const [isOpenBookModal, setIsOpenBookModal] = useState(false);

    const [phoneAndPass, setPhoneAndPass] = useState<any>({});
	const [phonePassName, setPhonePassName] = useState<any>({});
	const [allUsers, setAllUsers] = useState<any>({});
	const [profileText, setprofileText] = useState<any>('Авторизация');
	const [registrText, setRegistrText] = useState<any>('Регистрация');

    useEffect(() => {
        if (isOpenModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }
    }, [isOpenBookModal])

    const toggleBookModal = () => {
        setIsOpenBookModal(!isOpenBookModal);
    };


    useEffect(() => {
        const apiUrl = `http://localhost:5000/api/users`;
		axios.get(apiUrl).then((resp) => {
			const data = resp.data;
			setAllUsers(data);
		});
        const LS = JSON.parse(localStorage.getItem('user') || '{}');
        if (LS.name) {
            setprofileText(LS.name);
            setRegistrText('Выход');
        };
    }, [])

    useEffect(() => {
        if (isOpenModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'visible'
        }
    }, [isOpenModal])

    const toggleModal = () => {
        if (profileText === 'Авторизация') {
            setIsOpenModal(true);
        } else {
            navigate('/profile')
        }
    };
    
    const toggleRegModal = () => {
        if (registrText === 'Регистрация') {
                setPhonePassName({});
                setIsOpenModalReg(true);
        } else {
            localStorage.removeItem('user');
            navigate('/')
            window.location.reload()
        }
    };

    const onInputRegChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPhonePassName({
			...phonePassName,
			[e.target.id]: e.target.value
		})
	};

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setPhoneAndPass({
			...phoneAndPass,
			[e.target.id]: e.target.value
		})
	};

    const handleClick = () => {
        if (allUsers) {
            const isInclude = allUsers.find((user: any) => {
                return user.client_phone === phoneAndPass.phone && user.client_password === phoneAndPass.password
            })
            if (isInclude) {
                if (isInclude.role) {
                    const newValue = {
                        role: 'admin',
                        telephone: isInclude.client_phone,
                        name: isInclude.client_name,
                    }
                    localStorage.setItem('user', JSON.stringify(newValue));
                } else {
                    const newValue = {
                        role: 'user',
                        telephone: isInclude.client_phone,
                        name: isInclude.client_name,
                    }
                    localStorage.setItem('user', JSON.stringify(newValue));
                }
                navigate('/profile');
            }
            setIsOpenModal(false);
        }
    }

    const handleClickReg = () => {
        const isInclude = allUsers.find((user: any) => {
            return user.client_phone === phonePassName.phone
        })
        if (isInclude?.client_phone) {
            alert('такой пользователь уже существует');
        } else {
            const data = {
                client_name: phonePassName.name,
                client_phone: phonePassName.phone,
                client_password: phonePassName.password
            }
            axios.post(`http://localhost:5000/api/users`, data);
            localStorage.setItem('role', 'user');
            navigate('/profile')
        }
    }

    return (
        <div className={styles.wrapper}>
            {
                !isProfile && (
                    <div className={ styles.background} />
                )
            }
            {
                !isProfile && (
                    <img
                        onClick={() => navigate('/')}
                        className={cn(
                            styles.img,
                        )} 
                        src={headerIMG}
                        alt='header'
                    />
                )
            }
            <div
                className={cn(
                    styles.content,
                    {[styles.profileContent]: isProfile},
                )}
            >
                <div className={styles.headerContent}>
                    <img 
                        className={styles.logo}
                        src={logoSVG}
                        alt='logo'
                    />
                    <div className={styles.links}>

                    <div
                        className={cn(
                            styles.link,
                            styles.active
                        )}
                        onClick={() => navigate('/')}
                    >
                        ГЛАВНАЯ
                    </div>
                    <div
                        className={styles.link}
                        onClick={() => navigate('/')}
                    >
                        О НАС
                    </div>
                    <div
                        className={styles.link}
                        onClick={() => navigate('/')}
                    >
                        КОНТАКТЫ
                    </div>

                    </div>
                    <div
                        onClick={toggleModal}
                        className={cn(
                            styles.profile,
                            styles.link,
                            styles.active
                        )}
                    >
                        {profileText}
                    </div>
                    <div
                        onClick={toggleRegModal}
                        className={cn(
                            styles.profile,
                            styles.link,
                            styles.active
                        )}
                    >
                        {registrText}
                    </div>
                </div>
                {
                    !isProfile && (
                        <div className={styles.bodyContent}>
                                <div className={styles.title}>Сияй как в последний раз <div className={styles.text}>ВСЕГДА.</div></div>
                                <div className={styles.subtitle}>Lorem Ipsum is simply dummy text of the 
                                    printing and typesetting industry. Lorem Ipsum has been the industry's 
                                    standard dummy text ever since the 1500s
                                </div>
                                <button 
                                    className={styles.button2}
                                    onClick={toggleBookModal}    
                                >
                                    ЗАПИСАТЬСЯ
                                </button>
                        </div>
                    )
                }
            </div>
            {
                isOpenModal && (
                    <Modal
                        onClose={() => setIsOpenModal(false)}
                    >
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalTitle}>Авторизация</div>
                            <input 
                                onChange={(e: any) => onInputChange(e)} 
                                placeholder='Телефон'
                                id='phone'
                                className={styles.input}
                            />
                            <input 
                                onChange={(e: any) => onInputChange(e)} 
                                placeholder='Пароль'
                                id='password'
                                className={styles.input}
                            />
                            <button
                                onClick={handleClick}
                                className={styles.button}
                            >
                                Войти
                            </button>
                        </div>
                    </Modal>
                )
            }
            {
                isOpenModalReg && (
                    <Modal
                        onClose={() => setIsOpenModalReg(false)}
                    >
                        <div className={styles.modalWrapper}>
                            <div className={styles.modalTitle}>Регистрация</div>
                            <input 
                                onChange={(e: any) => onInputRegChange(e)} 
                                placeholder='Имя'
                                id='name'
                                className={styles.input}
                            />
                            <input 
                                onChange={(e: any) => onInputRegChange(e)} 
                                placeholder='Телефон'
                                id='phone'
                                className={styles.input}
                            />
                            <input 
                                onChange={(e: any) => onInputRegChange(e)} 
                                placeholder='Пароль'
                                id='password'
                                className={styles.input}
                            />
                            <button
                                onClick={handleClickReg}
                                className={styles.button}
                            >
                                Зарегистрироваться
                            </button>
                        </div>
                    </Modal>
                )
            }
            {
                isOpenBookModal && (
                    <Modal
                        onClose={toggleBookModal}
                    >
                        <Form onClose={toggleBookModal}/>
                    </Modal>
                )
            }
        </div>
    );
};

export default Header;