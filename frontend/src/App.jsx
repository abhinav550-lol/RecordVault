import './App.css'
import {  Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home.jsx'
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { config } from './env.js';
import axios from 'axios';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { Bounce, ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard.jsx';
import Main from './components/Main.jsx';
import Records from './components/Records.jsx';
import Documents from './components/Documents.jsx';
import Certificates from './components/Certificates.jsx';
import Create from './components/Create.jsx';

export default function App() {
	const navigate = useNavigate();
	const isAuthenticated = false;
	const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated);
	useEffect(() => {	
		const checkLoggedIn = async () => {
			try {
				const endPoint = config.BACKEND_URI + '/api/auth/status'
				const response = await axios.get(endPoint, { withCredentials: true })
				if (response.data.isLoggedIn) {
					setIsLoggedIn(true)
					const currentPath = window.location.pathname;
					if (
						currentPath === '/login' ||
						currentPath === '/register' ||
						currentPath === '/home' ||
						currentPath === '/'
					) {
						navigate('/dashboard');
					}
				}
			} catch (err) {
				console.error('Auth check failed:', err)
			}
		}
		checkLoggedIn()
	}, [isLoggedIn , navigate]);
  return ( 
	<>
			<ToastContainer 
			position="top-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="light"
			transition={Bounce}
			/>
			<Routes>	
				{/* Public Routes */}
				<Route path='/home' element={<Home/>}/> 
				<Route path='/login' element={<Login/>} />
				<Route path='/register' element={<Register/>} />
				{/* Private Routes */}
				<Route path='/' element={<Main />}>
				<Route index element={<Navigate to="dashboard" />} />
				<Route path='records' element={<Records />} />
				<Route path='dashboard' element={<Dashboard />} />
				<Route path='documents' element={<Documents />} />
				<Route path='certificates' element={<Certificates />} />
				</Route>
				<Route path='/create' element={<Create />} />
			</Routes>
	</>
   )
}

