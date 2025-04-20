import axios from "axios";
import { config } from "../env";
import { useNavigate } from "react-router-dom";
import { issueToast } from "./utils";

export default function Login(){
	document.title = 'Record Vault | Login'

	const navigate = useNavigate();
	const handleSubmit = async(e) => {
		e.preventDefault()

		const endPoint = config.BACKEND_URI + '/api/auth/login'
		try{
			const response = await axios.post(endPoint, {
				email: e.target.email.value,
				password: e.target.password.value
			} , {withCredentials: true});
	
			issueToast(response.data.message, 'success')
			navigate('/dashboard')
		}catch(err){
			issueToast(err.response.data.message, 'error')
		}
	}
	return(
		<div className="container flex flex-col gap-5 justify-center items-center h-screen">
			<h1 className="text-4xl font-bold poppins">Login</h1>
			<form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit} >
				<input type="text" placeholder="Email" name="email" className="border-2 border-gray-300 rounded-md p-2 w-80" />
				<input type="password" placeholder="Password" name="password" className="border-2 border-gray-300 rounded-md p-2 w-80" />
				<button type="submit" className="bg-white cursor-pointer text-black p-2 rounded-md w-48 mt-2">Login</button>
			</form>
		</div>
	)
}
