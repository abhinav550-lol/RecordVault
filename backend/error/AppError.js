class AppError extends Error{
	constructor(status , message){
		super(message)
		this.status = status
		this.name = this.constructor.name
	}
}

export default AppError;