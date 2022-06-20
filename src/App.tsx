import { BrowserRouter, Route, Routes } from 'react-router-dom';

import HomePage from 'pages/HomePage/HomePage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';

import Header from 'components/Header/Header';
import Book from 'components/Book/Book';

const App = () => {

	return (
			<BrowserRouter>
				<Book />
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='profile' element={<ProfilePage />} />
					</Routes>
		 		{/* footer */}
			</BrowserRouter>
	);
};

export default App;
