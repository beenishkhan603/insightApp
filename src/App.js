import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/auth/login';
import Signup from './components/auth/signup';
import Dashboard from './components/dashboard';
import PageNotFound from './components/PageNotFound';
import Product from './components/products';

import './App.css';

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/login" element={<Login />} />
				<Route path="/signup" element={<Signup />} />
				<Route path="/dashboard" element={<Dashboard />} />
				<Route path="/products" element={<Product />} />
				<Route path="*" element={<PageNotFound />} />
			</Routes>
		</Router>
	);
}

export default App;
