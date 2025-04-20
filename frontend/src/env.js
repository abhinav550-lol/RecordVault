const config = {}

config.FRONTEND_URI = import.meta.env.VITE_FRONTEND_URI || 'http://localhost:5173'
config.BACKEND_URI = import.meta.env.VITE_BACKEND_URI ||'http://localhost:3000'

export {config};