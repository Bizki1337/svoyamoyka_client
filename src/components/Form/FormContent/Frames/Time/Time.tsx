import cn from 'classnames';

import styles from './time.module.css';

interface ITime {
    title: string;
    times: ITimeItem[];
    time: number | null;
    handleClick: (time: number) => void;
}
interface ITimeItem {
    value: number;
    label: string;
    disabled?: boolean;
}

const Time = ({
    title,
    times,
    time,
    handleClick
}: ITime) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            <div className={styles.content}>
                {
                    times.length && times.map((item: ITimeItem) => (
                        <div className={cn(
                            styles.item,
                            {[styles.disable]: item.disabled},
                            {[styles.active]: item.value === time}
                        )}
                            key={item.value}
                            onClick={() => handleClick(item.value)}
                        >
                            {item.label}
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default Time;