import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { config } from '../../env';
import { issueToast } from '../utils';
import { useState } from 'react';
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';
import AddRecord from './AddRecord';

export default function Navbar(){
	const location = useLocation().pathname;
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const navigate = useNavigate();
	async function handleLogout(){
		console.log('logout');
		const response = await axios.post(`${config.BACKEND_URI}/api/auth/logout` , {} ,{withCredentials: true});

		if(response.data.success){
			issueToast(response.data.message, 'success');
			return navigate('/login');
		}
	}
	return(
		<nav className="h-18 bg-[#ebebeb] flex justify-between items-center px-10 relative">
		<div className="w-2/5 flex items-center">
		<div className="text-black mr-5 cursor-pointer" onClick={() => setIsSidebarOpen(true)}><svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px" fill="#000"><path d="M180-80q-24.75 0-42.37-17.63Q120-115.25 120-140v-483q-17-6-28.5-21.39T80-680v-140q0-24.75 17.63-42.38Q115.25-880 140-880h680q24.75 0 42.38 17.62Q880-844.75 880-820v140q0 20.22-11.5 35.61T840-623v483q0 24.75-17.62 42.37Q804.75-80 780-80H180Zm0-540v480h600v-480H180Zm-40-60h680v-140H140v140Zm220 260h240v-60H360v60Zm120 40Z"/></svg></div>
		{isSidebarOpen && <Sidebar sideBarFn={setIsSidebarOpen} currentLocation={location}/>}
		<form className="w-full flex justify-center items-center h-10">
		<input type="text" placeholder="Search Records..." className="p-4 h-full w-full  bg-black text-white poppins text-md  rounded-md" />
		<button className="border-l-2 border-white p-2 bg-black poppins  cursor-pointer h-full rounded	-md"><img src="/assets/search.svg" /></button>
		</form>
		</div>
		<div className="btns flex gap-2 h-10">
		<AddRecord/>
		<button className="rounded-md p-2 cursor-pointer bg-red-500 poppins text-md" onClick={handleLogout}>Logout</button>
		</div>
	</nav>	)
}
