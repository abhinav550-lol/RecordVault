import Navbar from './subcomponents/Navbar'
import { Outlet } from 'react-router-dom'

export default function Dashboard(){
	document.title = 'Dashboard | Record Vault'
	return(
		<div className="container flex flex-col">
			DashBoard
		</div>
	)
}	