import { useNavigate } from 'react-router-dom';
export default function Home(){
	const navigate = useNavigate();
	return(
		<div className="container flex flex-col gap-2  justify-center items-center h-screen">
			<h1 className="text-5xl font-bold poppins">Record Vault</h1>
			<p className="text-white text-3xl">All your college records, one organized space — stress less, succeed more.</p>
			<div className="authOptions flex gap-20 mt-4">
				<button className="cursor-pointer text-black bg-white px-4 py-2 rounded-md" onClick={() => navigate('/login')}>Login</button>
				<button className="cursor-pointer text-black bg-white px-4 py-2 rounded-md" onClick={() => navigate('/register')}>Register</button>
			</div>
		</div>
	)
}
