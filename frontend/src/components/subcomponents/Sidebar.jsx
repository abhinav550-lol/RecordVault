import { useNavigate, useLocation } from "react-router";
import { useState, useEffect } from "react";

export default function Sidebar({ sideBarFn }) {
	const navigate = useNavigate();
	const currentLocation = useLocation().pathname;
	const [currColoredBtn, setCurrColoredBtn] = useState(0);
	useEffect(() => {
		switch (currentLocation) {
			case '/dashboard':
				setCurrColoredBtn(0);
				break;
			case '/records':
				setCurrColoredBtn(1);
				break;
			case '/documents':
				setCurrColoredBtn(2);
				break;
			case '/certificates':
				setCurrColoredBtn(3);
				break;
			default:
				setCurrColoredBtn(0);
		}
	}, [location.pathname]);

	const getBtnClass = (index) => {
		return `rounded-md p-2 cursor-pointer poppins text-md h-10 flex gap-2 justify-start font-medium text-lg items-center ${currColoredBtn === index ? 'bg-[#3366ff] text-white' : ''}`;
	}
	return (
		<div className="w-screen h-screen bg-black/50 absolute top-0 left-0 z-1">
			<div className="w-1/5 flex flex-col gap-4 absolute top-0 left-0 bg-[#0a0f2c] h-screen p-2 z-10" >
				<button className="rounded-md p-2 cursor-pointer bg-red-500 poppins text-md w-20 h-10" onClick={() => sideBarFn(false)}>Close</button>
				<div className="navigators flex flex-col mx-4 my-8">
					<div className="navigators flex flex-col gap-2">
						<button className={getBtnClass(0)} onClick={() => { sideBarFn(() => false); navigate('/dashboard', 0) }}><svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z" /></svg>Dashboard</button>
						<button className={getBtnClass(1)} onClick={() => { sideBarFn(() => false); navigate('/records', 1) }}><svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" /></svg>Semester Records</button>
						<button className={getBtnClass(2)} onClick={() => { sideBarFn(() => false); navigate('/documents', 2) }}><svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M320-240h320v-80H320v80Zm0-160h320v-80H320v80ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z" /></svg>Personal Documents</button>
						<button className={getBtnClass(3)} onClick={() => { sideBarFn(() => false); navigate('/certificates', 3) }}><svg xmlns="http://www.w3.org/2000/svg" className="h-full" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="m387-412 35-114-92-74h114l36-112 36 112h114l-93 74 35 114-92-71-93 71ZM240-40v-309q-38-42-59-96t-21-115q0-134 93-227t227-93q134 0 227 93t93 227q0 61-21 115t-59 96v309l-240-80-240 80Zm240-280q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70ZM320-159l160-41 160 41v-124q-35 20-75.5 31.5T480-240q-44 0-84.5-11.5T320-283v124Zm160-62Z" /></svg>Certificates</button>
					</div>
				</div>
			</div>
		</div>
	)
}
