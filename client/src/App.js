import React from 'react';
import GlobalStyle from './globalStyles';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


function App() {
	return (
		<>
			<GlobalStyle />
			<Navbar />
			<Outlet />
			<Footer />
		</>
	);
}

export default App;
