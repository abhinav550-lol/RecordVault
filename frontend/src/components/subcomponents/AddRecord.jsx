import { useNavigate } from 'react-router-dom';

export default function AddRecord(){
	const navigate = useNavigate();
	return(
		<button className="rounded-md font-medium  p-2 cursor-pointer bg-gray-300 poppins text-md h-full w-40 flex justify-center items-center" onClick={() => navigate('/add')}>
			<svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" width="24px" fill="#000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
			<span className="text-black">Add</span>
		</button>
	)
}	

