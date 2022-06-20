import { ChangeEvent, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import DatePicker from 'sassy-datepicker';

import Time from './Frames/Time/Time';

import styles from './form.module.css';

interface ITimeItem {
    value: number;
    label: string;
    disable?: boolean;
}

interface IForm {
	onClose?: any;
}

const Form = ({
	onClose,
}: IForm) => {

	const getOwnDate = (date: Date) => {
		const day = date.getDate();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		if (month < 10) {
			return day + 'q0' + month + 'q' + year
		} else {
			return day + 'q' + month + 'q' + year;
		}
	}

	const [appState, setAppState] = useState<any>(null);

	const getDataByDate = (date: string) => {
		const apiUrl = `http://localhost:5000/api/books/${date}`;
		axios.get(apiUrl).then((resp) => {
			const data = resp.data;
			const newData = data.map((item: any) => item.time)
			setAppState(newData);
		});
	}

	useEffect(() => {
		getDataByDate(getOwnDate(new Date))
	}, []);

	const timeOptions = {
		morning: [
			{ value: 9, label: '09:00' },
			{ value: 9.5, label: '09:30' },
			{ value: 10, label: '10:00' },
			{ value: 10.5, label: '10:30' },
			{ value: 11, label: '11:00' },
			{ value: 11.5, label: '11:30' },
			{ value: 12, label: '12:00' },
			{ value: 12.5, label: '12:30' },
		],
		day: [
			{ value: 13, label: '13:00' },
			{ value: 13.5, label: '13:30' },
			{ value: 14, label: '14:00' },
			{ value: 14.5, label: '14:30' },
			{ value: 15, label: '15:00' },
			{ value: 15.5, label: '15:30' },
			{ value: 16, label: '16:00' },
			{ value: 16.5, label: '16:30' },
			{ value: 17, label: '17:00' },
			{ value: 17.5, label: '17:30' },
			{ value: 18, label: '18:00' },
			{ value: 18.5, label: '18:30' },
		],
		evening: [
			{ value: 19, label: '19:00' },
			{ value: 19.5, label: '19:30' },
			{ value: 20, label: '20:00' },
			{ value: 20.5, label: '20:30' },
			{ value: 21, label: '21:00' },
		],
	}

	const [newtimeOptions, setNewTimeOptions] = useState<any>(null)

	useEffect(() => {
			const newTimeOptionsMorning = timeOptions.morning.map(( newTimeOptionsItem: any) => {
				let newValue = newTimeOptionsItem;
				if (appState) {
					appState.forEach((item: any) => {
						if (newTimeOptionsItem.value === item) newValue = {...newTimeOptionsItem, disabled: true}
					});
				}
				return newValue;
			})
			const newTimeOptionsDay = timeOptions.day.map(( newTimeOptionsItem: any) => {
				let newValue = newTimeOptionsItem;
				if (appState) {
					appState.forEach((item: any) => {
						if (newTimeOptionsItem.value === item) newValue = {...newTimeOptionsItem, disabled: true}
					});
				}
				return newValue;
			})
			const newTimeOptionsEvening = timeOptions.evening.map(( newTimeOptionsItem: any) => {
				let newValue = newTimeOptionsItem;
				if (appState) {
					appState.forEach((item: any) => {
						if (newTimeOptionsItem.value === item) newValue = {...newTimeOptionsItem, disabled: true}
					});
				}
				return newValue;
			})
			setNewTimeOptions({
				morning: [...newTimeOptionsMorning],
				day: [...newTimeOptionsDay],
				evening: [...newTimeOptionsEvening]
			})
	}, [appState])

	const [time, setTime] = useState<null | number>(null);
	const [dateState, setDateState] = useState(getOwnDate(new Date));
	const [nameAndPhone, setNameAndPhone] = useState<any>({});

	const timeOptionsKeys = ['Утро', 'День', 'Вечер'];

	const handleClick = (time: number) => {
		setTime(time);
	}

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNameAndPhone({
			...nameAndPhone,
			[e.target.id]: e.target.value
		})
	};

	const onDateChange = (date: Date) => {
		setDateState(getOwnDate(date));
		getDataByDate(getOwnDate(date));
	}

	const book = () => {
		const data = {
			time,
			date: dateState,
			client_name: nameAndPhone.name,
			client_phone: nameAndPhone.phone
		}
		axios.post(`http://localhost:5000/api/books`, data);
		onClose();
	}

	return (
		<div className={styles.wrapper}>
			<input 
				onChange={(e: any) => onInputChange(e)} 
				placeholder='Имя'
				id='name'
				className={styles.input}
			/>
			<input 
				onChange={(e: any) => onInputChange(e)} 
				placeholder='Телефон'
				id='phone'
				className={styles.input}
			/>
			<div className={styles.date}>
				<DatePicker 
					minDate={new Date()}
					onChange={(e) => onDateChange(e)} 
				/>
			</div>
			{
				newtimeOptions ? (
					<>
						<Time
							handleClick={handleClick}
							times={newtimeOptions.morning}
							title={timeOptionsKeys[0]}
							time={time}
						/>
						<Time
							handleClick={handleClick}
							times={newtimeOptions.day}
							title={timeOptionsKeys[1]}
							time={time}
						/>
						<Time
							handleClick={handleClick}
							times={newtimeOptions.evening}
							title={timeOptionsKeys[2]}
							time={time}
						/>
					</> 
				) : <div>loading....</div>
			}

			<button
				className={styles.button}
				onClick={book}
			>
				Забронировать
			</button>
		</div>
	);
};

export default Form;
