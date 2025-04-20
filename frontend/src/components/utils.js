import { Bounce, toast } from 'react-toastify';

const issueToast = (message, type) => {
	toast(message, {
		position: "top-center",
		autoClose: 1500,
		hideProgressBar: false,
		closeOnClick: false,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
		theme: "light",
		type: type,
		transition: Bounce,
	})
}

export { issueToast };