export default function wrapAsyncErrors(fn) {
	return (req, res, next) => {
	  Promise.resolve(fn(req, res, next)).catch(next);
	};
  }
  