import { useEffect, useState } from 'react';
import axios from 'axios';
import cn from 'classnames';

import Header from 'components/Header/Header';

import styles from './profilePage.module.css';

const ProfilePage = () => {

    const tabs = ['История', 'Обратная связь', 'Клиенты'];

    const [books, setBooks] = useState<any>();
    const [usersInfo, setUsersInfo] = useState<any>();
    const [user, setUser] = useState<any>();
    const [activeTab, setActiveTab] = useState('История');
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user') || '{}'))
    }, []);
   
    useEffect(() => {
        let url, url2;
        if (user?.role) {
            if (user?.role === 'user') {
                url = `http://localhost:5000/api/books/phone/${user.telephone}`;
            } else {
                url = 'http://localhost:5000/api/books';
                url2 = 'http://localhost:5000/api/users';
                axios.get(url2).then((resp) => {
                    const data = resp.data;
                    setUsersInfo(data);
                });
            };
            axios.get(url).then((resp) => {
                const data = resp.data;
                setBooks(data);
            });
        }
	}, [user]);

    const deleteBook = (id: string) => {
        const url = `http://localhost:5000/api/books/${id}`;
        const newBooks = books.filter((item: any) => item._id !== id);
        axios.delete(url);
        setBooks(newBooks)
    }

    const deleteUser = (id: string) => {
        const url = `http://localhost:5000/api/users/${id}`;
        const newUsers = usersInfo.filter((item: any) => item._id !== id);
        axios.delete(url);
        setUsersInfo(newUsers)
    }

    return (
        <div>
            <Header 
                isProfile={true}
            />
            <div className={styles.content}>
                <div className={styles.title}>
                    {activeTab}
                </div>
                <div className={styles.wrapperContent}>
                    <div className={styles.tabs}>
                        <div
                            className={cn(
                                styles.tab,
                                {[styles.active]: activeTab === 'История'},
                            )}
                            onClick={() => setActiveTab('История')}
                        >
                            История
                        </div>
                        {
                            user && user.role === 'admin' && (
                                <div
                                    onClick={() => setActiveTab('Клиенты')}
                                    className={cn(
                                        styles.tab,
                                        {[styles.active]: activeTab === 'Клиенты'},
                                    )}
                                >
                                    Клиенты
                                </div>
                            )
                        }
                        <div 
                            className={cn(
                                styles.tab,
                                {[styles.active]: activeTab === 'Обратная связь'},
                            )}
                            onClick={() => setActiveTab('Обратная связь')}
                        >
                            Обратная связь
                        </div>
                    </div>
                    <div className={styles.tabWrapper}>
                        {
                            activeTab === 'История' && (
                                <div>
                                    {
                                        books && books.map((item: any) => (
                                            <div
                                                className={styles.wrapper}
                                                key={item._id}
                                            >   
                                                <div className={styles.item}>
                                                    <div>
                                                        <div>Имя: </div>
                                                        <div className={styles.fix}>{item.client_name}</div>
                                                    </div>
                                                    <div>
                                                        <div>Телефон: </div>
                                                        <div className={styles.fix}>{item.client_phone}</div>
                                                    </div>
                                                    <div>
                                                        <div>Дата: </div>
                                                        <div className={styles.fix}>{item.date.replace(/q/g, '/')}</div>
                                                    </div>
                                                    <div 
                                                        className={styles.delete}
                                                        onClick={() => deleteBook(item._id)}
                                                    >
                                                        Удалить
                                                    </div>
                                                </div>
                                                <div className={styles.border}>
                                                    <div>---</div>
                                                    <div className={styles.circle}>
                                                        <div className={styles.miniCircle} />
                                                    </div> 
                                                    <div>---</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                        {
                            activeTab === 'Обратная связь' && (
                                <div className={styles.tabContent}>
                                        <div className={styles.tabTitle}>
                                            Напишите нам:
                                        </div>
                                        <textarea className={styles.textArea} />
                                        <button
                                            className={styles.button}
                                        >
                                            Отправить
                                        </button>
                                </div>
                            )
                        }
                        {
                            activeTab === 'Клиенты' && usersInfo && (
                                <div>
                                    {
                                        usersInfo && usersInfo.map((item: any) => (
                                            <div
                                                className={styles.wrapper}
                                                key={item._id}
                                            >   
                                                <div className={styles.item}>
                                                    <div>
                                                        <div>Имя: </div>
                                                        <div className={styles.fix}>{item.client_name}</div>
                                                    </div>
                                                    <div>
                                                        <div>Телефон: </div>
                                                        <div className={styles.fix}>{item.client_phone}</div>
                                                    </div>
                                                    <div>
                                                        <div>Пароль: </div>
                                                        <div className={styles.fix}>{item.client_password}</div>
                                                        <div 
                                                            className={styles.delete}
                                                            onClick={() => deleteUser(item._id)}
                                                        >
                                                            Удалить
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={styles.border}>
                                                    <div>---</div>
                                                    <div className={styles.circle}>
                                                        <div className={styles.miniCircle} />
                                                    </div> 
                                                    <div>---</div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;