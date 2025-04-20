import axios from "axios"
import { config } from "../env"
import { issueToast } from "./utils"
import { useState } from "react"
import { useNavigate } from "react-router"

export default function Register(){
	document.title = 'Record Vault | Register'
	const navigate = useNavigate()
	const handleSubmit = async(e) => {
		e.preventDefault()
		const endPoint = config.BACKEND_URI + '/api/auth/register'
		try{
			const response = await axios.post(endPoint, formData , {withCredentials: true});
			issueToast(response.data.message, 'success')	
			navigate('/dashboard')
		}catch(err){
			issueToast(err.response.data.message, 'error')
		}
	}	

	const [page, setPage] = useState(1);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		phoneNo: '',
		year: '',
		branch: '',
		password: '',
		confirmPassword: ''	
	})
	const handleFormChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value})
	}	
	const handlePageChange = (page) => {
		setPage(page)
	}


	return(
		<div className="container flex flex-col gap-5 justify-center items-center h-screen">
			<h1 className="text-4xl font-bold poppins">Register</h1>
			<form className="flex flex-col gap-2 items-center" onSubmit={handleSubmit} >
				{page === 1 && (
					<>
						<input type="text" placeholder="Name" name="name" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
						<input type="text" placeholder="Email" name="email" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
						<input type="tel" placeholder="+91-9810000000" name="phoneNo" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange}/>
					</>
				)}
				{page === 2 && (
					<>
						<input type="text" placeholder="Year" name="year" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
						<input type="text" placeholder="Branch" name="branch" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
					</>
				)}	
				{page === 3 && (
					<>
						<input type="password" placeholder="Password" name="password" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
						<input type="password" placeholder="Confirm Password" name="confirmPassword" className="border-2 border-gray-300 rounded-md p-2 w-80" onChange={handleFormChange} />
					</>
				)}	
				<div className="controls flex gap-7 items-center">
					<div onClick={() => page > 1 && handlePageChange(page => page - 1)}  className="cursor-pointer hover:underline">Back</div>
					<div className="circle circle1 h-2 w-2 rounded-full bg-gray-300">{page === 1 && <div className="circle circle1 h-2 w-2 rounded-full bg-green-600"></div>}</div>
					<div className="circle circle2 h-2 w-2 rounded-full bg-gray-300">{page === 2 && <div className="circle circle1 h-2 w-2 rounded-full bg-green-600"></div>}</div>
					<div className="circle circle3 h-2 w-2 rounded-full bg-gray-300">{page === 3 && <div className="circle circle1 h-2 w-2 rounded-full bg-green-600"></div>}</div>
					<div onClick={() => page < 3 && handlePageChange(page => page + 1) } disabled={page === 3} className="cursor-pointer hover:underline">Next</div>
				</div>
				<button type="submit" className="bg-white cursor-pointer text-black p-2 rounded-md w-48 mt-2">Register</button>
			</form>
		</div>
	)
}


/*
FirstPage -> Name , email , phoneNo
SecondPage -> year, branch
Last PAge -> Password , ConfirmPassword
*/